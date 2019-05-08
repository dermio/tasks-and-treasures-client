import prizesReducer from "./prizes";

import { getPrizeSuccess } from "../actions/prizes";

describe("prizesReducer", () => {
  let data = {
    prizeName: "Disneyland",
    familyCode: "skywalker"
  };


  it("Should set the initial state when nothing is passed in", () => {
    // Initial state copied from prizesReducer
    let initialState = {
      pending_GET_prize: false,
      error_GET_prize: false,
      pending_CREATE_prize: false,
      error_CREATE_prize: false,
      pending_DELETE_prize: false,
      error_DELETE_prize: false,
      userPrize: null
    };
    let state = prizesReducer(undefined, { type: "_UNKNOWN" });

    expect(state).toEqual(initialState);
  });

  it("Should return the current state on an unknown action", () => {
    let currentState = {
      pending_GET_prize: false,
      error_GET_prize: false,
      pending_CREATE_prize: false,
      error_CREATE_prize: false,
      pending_DELETE_prize: false,
      error_DELETE_prize: false,
      userPrize: null
    };
    let state = prizesReducer(currentState, { type: "_UNKNOWN" });

    expect(state).toEqual(currentState);
  });

  it("Should return the Prize on a successful GET request", () => {
    let state = {
      pending_GET_prize: false,
      error_GET_prize: false,
      pending_CREATE_prize: false,
      error_CREATE_prize: false,
      pending_DELETE_prize: false,
      error_DELETE_prize: false,
      userPrize: null
    };

    let currentState = {
      pending_GET_prize: false,
      error_GET_prize: false,
      pending_CREATE_prize: false,
      error_CREATE_prize: false,
      pending_DELETE_prize: false,
      error_DELETE_prize: false,
      userPrize: data // Prize added to `userPrize`
    };

    state = prizesReducer(state, getPrizeSuccess(data));

    expect(state).toEqual(currentState);
  });
});

