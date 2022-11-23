import { mount } from "@vue/test-utils";

import ActionButton from "@/components/ActionButton";

describe("ActionButton", () => {
  it("renders text", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "I'm clickable",
        type: "primary",
      },
    });
    expect(wrapper.text()).toMatch("I'm clickable");
  }); //test output text

  it("applies one of several style to button", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "I'm clickable",
        //type: "primary",
      },
    });
    const button = wrapper.find("button");
    expect(button.classes("primary")).toBe(true);
  });
});
