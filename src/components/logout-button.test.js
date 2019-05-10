import React from "react";
import { shallow, mount } from "enzyme";

import { LogoutButton } from "./logout-button";

import { clearAuth } from "../actions/auth";


describe("<LogoutButton />", () => {
  it("Renders without crashing", () => {
    shallow(<LogoutButton />);
  });

  it("Dispatches `clearAuth` from `handleLogout`", () => {
    const dispatch = jest.fn();
    const wrapper = shallow(
      <LogoutButton
        dispatch={dispatch}
      />
    );
    const instance = wrapper.instance();
    instance.handleLogout({});

    expect(dispatch).toHaveBeenCalledWith(clearAuth());
  });

});


/*
Import no bracket
Invariant Violation: Could not find "store" in either the context or props
of "Connect(LogoutButton)". Either wrap the root component in a <Provider>,
or explicitly pass "store" as a prop to "Connect(LogoutButton)".


Import with bracket
It Works!
*/
