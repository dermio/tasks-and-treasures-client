import tasksReducer from "./tasks";

import { getTasksSuccess } from "../actions/tasks";

describe("tasksReducer",  () => {
  let taskName1 = "fold clothes";
  let taskName2 = "walk dog";
  let familyCode = "smith";

  let task1 = {
    taskName: taskName1,
    familyCode
  };
  let task2 = {
    taskName: taskName2,
    familyCode
  };
  let data = [task1, task2];


  it("Should set the initial state when nothing is passed in", () => {
    // Initial state copied from tasksReducer
    let initialState = {
      pending_GET_tasks: false,
      error_GET_tasks: false,
      pending_CREATE_task: false,
      error_CREATE_task: false,
      pending_DELETE_task: false,
      error_DELETE_task: false,
      pending_UPDATE_task: false,
      error_UPDATE_task: false,
      allUserTasks: [],
      allChildStatus: [],
      tasksBeingEdited: {}
    };
    let state = tasksReducer(undefined, { type: "_UNKNOWN" });

    expect(state).toEqual(initialState);
  });

  it("Should return the current state on an unknown action", () => {
    // Initial state copied from tasksReducer
    let currentState = {
      pending_GET_tasks: true, // Changed to true, differs from initial state
      error_GET_tasks: false,
      pending_CREATE_task: false,
      error_CREATE_task: false,
      pending_DELETE_task: false,
      error_DELETE_task: false,
      pending_UPDATE_task: false,
      error_UPDATE_task: false,
      allUserTasks: [],
      allChildStatus: [],
      tasksBeingEdited: {}
    };
    let state = tasksReducer(currentState, { type: "_UNKNOWN" });

    expect(state).toEqual(currentState);
  });

  it("Should return the Tasks list on a successful GET request", () => {
    let state = {
      pending_GET_tasks: false,
      error_GET_tasks: false,
      pending_CREATE_task: false,
      error_CREATE_task: false,
      pending_DELETE_task: false,
      error_DELETE_task: false,
      pending_UPDATE_task: false,
      error_UPDATE_task: false,
      allUserTasks: [],
      allChildStatus: [],
      tasksBeingEdited: {}
    };

    let currentState = {
      pending_GET_tasks: false,
      error_GET_tasks: false,
      pending_CREATE_task: false,
      error_CREATE_task: false,
      pending_DELETE_task: false,
      error_DELETE_task: false,
      pending_UPDATE_task: false,
      error_UPDATE_task: false,
      allUserTasks: [...data], // All the tasks added to `allUserTasks`
      allChildStatus: [],
      tasksBeingEdited: {}
    };

    state = tasksReducer(state, getTasksSuccess(data));

    expect(state).toEqual(currentState);
  });
});

