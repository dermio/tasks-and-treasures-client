import React from "react";
import { shallow, mount } from "enzyme";


/* If using React-Redux, to test the Connected component will need to wrap
the Connected component in <Provider />. If want to test the
Unconnected component, test the undecorated component from the
Named export. Note the brackets around the named export component. */
import { Dashboard } from "./dashboard"; // Unconnected component


describe("<Dashboard />", () => {
  it("Renders without crashing", () => {
    shallow(<Dashboard />);
  });
});

