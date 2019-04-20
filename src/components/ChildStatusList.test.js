import React from "react";
import { shallow, mount } from "enzyme";

import { ChildStatusList } from "./ChildStatusList";


describe("<ChildStatusList />", () => {
  it("Renders without crashing", () => {
    shallow(
      <ChildStatusList
        childStatusList={[]}
        dispatch={(action) => {}}
      />
    );
  });

});

