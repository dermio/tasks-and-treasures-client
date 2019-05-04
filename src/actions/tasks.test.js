import {
  GET_TASKS_SUCCESS, getTasksSuccess,
  CREATE_TASK_SUCCESS, createTaskSuccess,
  DELETE_TASK_SUCCESS, deleteTaskSuccess,
  UPDATE_TASK_SUCCESS, updateTaskSuccess
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

describe("deleteTaskSuccess", () => {
  it("Should return the action for Delete Task success", () => {
    const data = {
      status: 204
    };
    const action = deleteTaskSuccess(data);

    expect(action.type).toEqual(DELETE_TASK_SUCCESS);
    expect(action.data.status).toEqual(204);
  });
});

describe("updateTaskSuccess", () => {
  it("Should return the action for Update Task success", () => {
    const data = {
      taskName: "homework", // Updated taskName
      familyCode: "smith"
    };
    const action = updateTaskSuccess(data);

    expect(action.type).toEqual(UPDATE_TASK_SUCCESS);
    expect(action.data.taskName).toEqual(data.taskName);
  });
});

