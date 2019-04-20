import React from "react";
import { shallow, mount } from "enzyme";

import { CreateTaskForm } from "./create-task-form";


describe("<CreateTaskForm />", () => {
  it("Renders without crashing", () => {
    shallow(<CreateTaskForm />);
  });

});

