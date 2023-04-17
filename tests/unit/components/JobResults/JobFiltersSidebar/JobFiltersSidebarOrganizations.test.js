import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import JobFiltersSidebarOrganization from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarOrganization.vue";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

describe("JobFiltersSidebarOrganizations", () => {
  const renderJobFiltersSidebarOrganizations = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const userStore = useUserStore();
    const $router = { push: vi.fn() };
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Microsoft"]);

    render(JobFiltersSidebarOrganization, {
      global: {
        mocks: { $router },
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore, userStore, $router };
  };
  it("renders unique list of organizations from jobs", async () => {
    const { jobsStore } = renderJobFiltersSidebarOrganizations();

    const button = screen.getByRole("button", { name: /organizations/i });
    await userEvent.click(button);

    const orgListItems = screen.getAllByRole("listitem");
    const org = orgListItems.map((node) => node.textContent);
    expect(org).toEqual(["Google", "Microsoft"]);
  });
  describe("when user check", () => {
    it("communicates that user has checked the box", async () => {
      const { jobsStore, userStore } = renderJobFiltersSidebarOrganizations();

      const button = screen.getByRole("button", { name: /organizations/i });
      await userEvent.click(button);

      const googleCheckbox = screen.getByRole("checkbox", { name: /google/i });
      await userEvent.click(googleCheckbox);

      expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith([
        "Google",
      ]);
    });

    it("navigates user to job results", async () => {
      const { jobsStore, $router } = renderJobFiltersSidebarOrganizations();
      jobsStore.UNIQUE_JOB_TYPES = new Set(["Google"]);

      const button = screen.getByRole("button", { name: /organizations/i });
      await userEvent.click(button);

      const googleCheckbox = screen.getByRole("checkbox", {
        name: /google/i,
      });
      await userEvent.click(googleCheckbox);

      expect($router.push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
