import {
  SET_AUTH_TOKEN, setAuthToken,
  CLEAR_AUTH, clearAuth,
  AUTH_SUCCESS, authSuccess,
  UPDATE_CHILD_INTERVAL, updateChildInterval,
  updateCurrentUser, UPDATE_CURRENT_USER
} from "./auth";


describe("setAuthToken", () => {
  it("Should return the action for Set Auth Token", () => {
    const randomToken = "blah_blah_123";
    const action = setAuthToken(randomToken);

    expect(action.type).toEqual(SET_AUTH_TOKEN);
    expect(action.authToken).toEqual(randomToken);
  });
});

describe("clearAuth", () => {
  it("Should return the action for Clear Auth", () => {
    const action = clearAuth();

    expect(action.type).toEqual(CLEAR_AUTH);
  });
});

describe("authSuccess", () => {
  it("Should return the action for Auth Success", () => {
    const currentUser = "Optimus Prime";
    const action = authSuccess(currentUser);

    expect(action.type).toEqual(AUTH_SUCCESS);
    expect(action.currentUser).toEqual(currentUser);
  });
});

describe("updateChildInterval", () => {
  it("Should return the action of Update Child Interval", () => {
    const interval = 32;
    const action = updateChildInterval(interval);

    expect(action.type).toEqual(UPDATE_CHILD_INTERVAL);
    expect(action.interval).toEqual(interval);
  });
});

describe("updateCurrentUser", () => {
  it("Should return the action of Update Current User", () => {
    const updatedUser = "Megatron";
    const action = updateCurrentUser(updatedUser);

    expect(action.type).toEqual(UPDATE_CURRENT_USER);
    expect(action.user).toEqual(updatedUser);
  });
});

