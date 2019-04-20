import React from "react";
import { shallow, mount } from "enzyme";

import { RegistrationForm }  from "./registration-form";

import { registerUser } from "../actions/users";
import { login } from "../actions/auth";


describe("<RegistrationForm />", () => {
  it("Renders without crashing", () => {
    shallow(
      <RegistrationForm
        handleSubmit={() => {}}
      />
    );
  });
});

