import React from "react";
import { shallow, mount } from "enzyme";

import App from "./App.js";


describe("<App />", () => {
  it("Should render without crashing", () => {
    shallow(<App />);
  });
});


