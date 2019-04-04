import React from "react";
import { shallow, mount } from "enzyme";

import ChildStatusList from "./login-form";


describe("<ChildStatusList />", () => {
  it("Renders without crashing", () => {
    shallow(<ChildStatusList />);
  });

});

