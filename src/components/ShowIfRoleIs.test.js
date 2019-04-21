import React from "react";
import { shallow, mount } from "enzyme";

import { ShowIfRoleIs } from "./ShowIfRoleIs";


describe("<ShowIfRoleIs />", () => {
  it("Renders without crashing", () => {
    shallow(<ShowIfRoleIs />);
  });

  it("Renders `null` if the userRole is NOT the parent", () => {
    const wrapper = shallow(
      <ShowIfRoleIs
        shouldShow={false}
      />
    );
    expect(wrapper.getElement()).toBe(null);
  });
});

