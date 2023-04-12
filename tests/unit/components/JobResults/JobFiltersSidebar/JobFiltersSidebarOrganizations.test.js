import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import JobFiltersSidebarOrganization from "@/components/JobResults/JobFilterSidebar/JobFiltersSidebarOrganization.vue";

import { useJobsStore } from "@/stores/jobs";

describe("JobFiltersSidebarOrganizations", () => {
  it("renders unique list of organizations from jobs", async () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Microsoft"]);

    render(JobFiltersSidebarOrganization, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    const button = screen.getByRole("button", { name: /organizations/i });
    await userEvent.click(button);

    const orgListItems = screen.getAllByRole("listitem");
    const org = orgListItems.map((node) => node.textContent);
    expect(org).toEqual(["Google", "Microsoft"]);
  });
});
