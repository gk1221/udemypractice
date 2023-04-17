import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarJobTypes.vue";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

describe("JobFiltersSidebarJobTypes", () => {
  const renderJobFiltersSidebarJobTypes = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const userStore = useUserStore();
    const $router = { push: vi.fn() };

    render(JobFiltersSidebarJobTypes, {
      global: {
        mocks: {
          $router,
        },
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore, userStore, $router };
  };
  it("renders unique list of job types from jobs", async () => {
    const { jobsStore } = renderJobFiltersSidebarJobTypes();
    jobsStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);

    const button = screen.getByRole("button", { name: /jobtypes/i });
    await userEvent.click(button);

    const jobTypesListItems = screen.getAllByRole("listitem");
    const jt = jobTypesListItems.map((node) => node.textContent);
    expect(jt).toEqual(["Full-time", "Part-time"]);
  });
  describe("when user clicks checkbox", () => {
    it("communicates that user has checked the box", async () => {
      const { jobsStore, userStore } = renderJobFiltersSidebarJobTypes();
      jobsStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);

      const button = screen.getByRole("button", { name: /jobtypes/i });
      await userEvent.click(button);

      const googleCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(googleCheckbox);

      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith([
        "Full-time",
      ]);
    });

    it("navigates user to job results page to see fres bathc of filtered jobs", async () => {
      const { jobsStore, $router } = renderJobFiltersSidebarJobTypes();
      jobsStore.UNIQUE_JOB_TYPES = new Set(["Full-time"]);

      const button = screen.getByRole("button", { name: /jobtypes/i });
      await userEvent.click(button);

      const googleCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(googleCheckbox);

      expect($router.push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
