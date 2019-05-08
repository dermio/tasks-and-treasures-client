import familyReducer from "./family";

import { getFamilySuccess } from "../actions/family";

describe("familyReducer", () => {
  let data = {
    familyCode: "smith",
    tasksFinalized: false,
    currentPrize: null,
    currentTasks: []
  };


  it("Should set the initial state when nothing is passed in", () => {
    let state = familyReducer(undefined, { type: "_UNKNOWN" });

    // Initial state for family reducer is an empty object
    expect(state).toEqual({});
  });

  it("Should return the current state on an unknown action", () => {
    let currentState = {};
    let state = familyReducer(currentState, { type: "_UNKNOWN" });

    expect(state).toEqual(currentState);
  });

  it("Should return the Family on a successful GET request", () => {
    let currentState = {
      familyCode: "smith",
      tasksFinalized: false,
      currentPrize: null,
      currentTasks: []
    };
    let state = familyReducer({}, getFamilySuccess(data));

    expect(state).toEqual(currentState);
  });
});

