import {
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR
} from "../actions/tasks";


// Most robust pattern is to have 4 loading STATES:
// i.e. loading: PENDING-GET, PENDING-CREATE, PENDING-DELETE, PENDING-UPDATE
// Also have 4 loading ERROR STATES
// ERROR: ERROR-GET, ERROR-CREATE, ERROR-DELETE, ERROR-UPDATE
const initialState = {
  // loading: GET-PENDING, CREATE-PENDING, etc...
  // errors: ERROR-GET, ERROR-CREATE, etc...
  pending_GET_tasks: false,
  error_GET_tasks: false,
  pending_CREATE_task: false,
  error_CREATE_task: false,
  allUserTasks: [], // the data, success
};

export default function reducer(state = initialState, action) {
  if (action.type === GET_TASKS_REQUEST) {
    return Object.assign({}, state, {
      pending_GET_tasks: true
    });
  } else if (action.type === GET_TASKS_SUCCESS) {
    return Object.assign({}, state, {
      pending_GET_tasks: false,
      allUserTasks: action.data,
      error_GET_tasks: false
    });
  } else if (action.type === GET_TASKS_ERROR) {
    return Object.assign({}, state, {
      pending_GET_tasks: false,
      error_GET_tasks: action.error
    });
  } else if (action.type === CREATE_TASK_REQUEST) {
    return Object.assign({}, state, {
      pending_CREATE_task: true
    });
  } else if (action.type === CREATE_TASK_SUCCESS) {
    return Object.assign({}, state, {
      pending_CREATE_task: false,
      error_CREATE_task: false
    });
  } else if (action.type === CREATE_TASK_ERROR) {
    return Object.assign({}, state, {
      pending_CREATE_task: false,
      error_CREATE_task: action.error
    });
  }
  return state;
};
