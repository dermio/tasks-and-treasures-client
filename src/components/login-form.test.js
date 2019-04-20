import React from "react";
import { shallow, mount } from "enzyme";

import { LoginForm } from "./login-form";


describe("<LoginForm />", () => {
  it("Renders without crashing", () => {
    shallow(
      <LoginForm
        handleSubmit={() => {}}
      />
    );
  });

  // it("Renders the `Login` button initially", () => {
  //   let wrapper = shallow(<LoginForm />);
  //   expect(wrapper.hasClass("login-form")).toEqual(true);
  //   expect(wrapper.hasClass('add-button')).toEqual(true);

  // });
});

