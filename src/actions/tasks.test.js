import {
  GET_TASKS_SUCCESS, getTasksSuccess,
  CREATE_TASK_SUCCESS, createTaskSuccess
} from "./tasks";

describe("createTaskSuccess", () => {
  it("Should return the action for Create Task success", () => {
    const data = {
      taskName: "fold clothes",
      familyCode: "smith",
      completions: []
    };
    const action = createTaskSuccess(data);

    expect(action.type).toEqual(CREATE_TASK_SUCCESS);
    expect(action.data).toEqual(data);
  });
});

describe("getTasksSuccess", () => {
  it("Should return the action for Get Task success", () => {
    const data = [
      {
        taskName: "fold clothes",
        familyCode: "smith",
        completions: []
      },
      {
        taskName: "churn butter",
        familyCode: "smith",
        completions: []
      }
    ];
    const action = getTasksSuccess(data);

    expect(action.type).toEqual(GET_TASKS_SUCCESS);
    expect(action.data).toEqual(data);
  });
});

