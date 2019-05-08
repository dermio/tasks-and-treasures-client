import authReducer from "./auth";

import { authSuccess, setAuthToken } from "../actions/auth";

describe("authReducer", () => {
  // Initial state copied from authReducer
  let initialState = {
    authToken: null, // authToken !== null does not mean it has been validated
    currentUser: null,
    loading: false,
    error: null
  };


  it("Should set the initial state when nothing is passed in", () => {
    let state = authReducer(undefined, { type: "_UNKNOWN" });

    expect(state).toEqual(initialState);
  });

  it("Should return the current state on an unknown action", () => {
    let currentState = {
      authToken: null,
      currentUser: null,
      loading: false,
      error: null
    };
    let state = authReducer(currentState, { type: "_UNKNOWN" });

    expect(state).toEqual(currentState);
  });

  it("Should set the current user when authentication is successful", () => {
    let currentState = {
      authToken: null,
      currentUser: "bubba",
      loading: false,
      error: null
    };
    let state = authReducer(initialState, authSuccess("bubba"));

    expect(state).toEqual(currentState);
  });

  it("Should set the auth token when authentication is successful", () => {
    let randomToken = "123-abc-fishing";
    let currentState = {
      authToken: "123-abc-fishing",
      currentUser: null,
      loading: false,
      error: null
    };
    let state = authReducer(initialState, setAuthToken(randomToken));

    expect(state).toEqual(currentState);
  });
});

