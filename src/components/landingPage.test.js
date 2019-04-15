import React from "react";
import { shallow, mount } from "enzyme";

import ConnectedLandingPage, { LandingPage } from "./landingPage";

describe("<LandingPage", () => {
  it("Renders without crashing", () => {
    shallow(
      <LandingPage
        location={""}
      />
    );
  });

  /*
  1 Also want to test <LandingPage /> will render the correct child component,
  <LoginForm /> or <RegistrationForm /> based on `location.pathname`
  */
});



/*
import No brackets
Invariant Violation: Could not find "store" in either the context or props
of "Connect(LandingPage)". Either wrap the root component in a <Provider>,
or explicitly pass "store" as a prop to "Connect(LandingPage)".



import with brackets
TypeError: Cannot read property 'pathname' of undefined
*/

