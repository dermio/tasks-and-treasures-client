import {
  GET_FAMILY_SUCCESS, getFamilySuccess,
  FINALIZE_TASKS_LIST_SUCCESS, finalizeTasksListSuccess,
  RESET_TASKS_LIST_SUCCESS, resetTasksListSuccess
} from "./family";


describe("getFamilySuccess", () => {
  it("Should return the action for Get Family success", () => {
    /* The mock data value is assigned to the `family` key
    in the GET_FAMILY_SUCCESS action creator */
    const data = {
      message: "Random string, access granted to Family API",
      family: {
        familyCode: "smith",
        tasksFinalized: false,
        currentPrize: null,
        currentTasks: []
      }
    };
    const action = getFamilySuccess(data);

    expect(action.type).toEqual(GET_FAMILY_SUCCESS);

    expect(action.family.message).toEqual(data.message);
    expect(action.family.family.familyCode).toEqual(data.family.familyCode);
    expect(action.family.family.tasksFinalized).toEqual(false);
    expect(action.family.family.currentPrize).toEqual(null);
    expect(action.family.family.currentTasks).toEqual([]);
  });
});

describe("finalizeTasksListSuccess", () => {
  it("Should return the action for Finalize Tasks List success", () => {
    // No data to pass to action creator

    const action = finalizeTasksListSuccess();
    expect(action.type).toEqual(FINALIZE_TASKS_LIST_SUCCESS);
  });
});

describe("resetTasksListSuccess", () => {
  it("Should return the action for Reset Tasks List success", () => {
    // No data to pass to action creator

    const action = resetTasksListSuccess();
    expect(action.type).toEqual(RESET_TASKS_LIST_SUCCESS);
  });
});

