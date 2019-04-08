import React from "react";
import { shallow, mount } from "enzyme";

import { Header } from "./Header";


describe("<Header />", () => {
  it("Renders withou crashing", () => {
    shallow(<Header />);
  });
});

