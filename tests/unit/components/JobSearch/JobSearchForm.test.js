import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";

describe("JobSearchForm", () => {
  describe("when user submitted form", () => {
    it("direct user to job results page with user's parameters", async () => {
      const push = vi.fn();
      const $router = { push };
      render(JobSearchForm, {
        global: {
          mocks: {
            $router: $router,
          },
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const roleInput = screen.getByRole("textbox", {
        name: /role/i,
      });
      await userEvent.type(roleInput, "Vue Developer");

      const locationInput = screen.getByRole("textbox", {
        name: /where/i,
      });
      await userEvent.type(locationInput, "New York");

      const submitbutton = screen.getByRole("button", {
        name: /search/i,
      });
      await userEvent.click(submitbutton);

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: { role: "Vue Developer", location: "New York" },
      });
    });
  });
});
