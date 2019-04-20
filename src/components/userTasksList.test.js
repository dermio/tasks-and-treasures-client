import React from "react";
import { shallow, mount } from "enzyme";

import { UserTasksList } from "./userTasksList";


describe("<UserTasksList />", () => {
  it("Renders without crashing", () => {
    shallow(
      <UserTasksList
        userTasks={[]}
        dispatch={() => {}}
      />
    );
  });
});


