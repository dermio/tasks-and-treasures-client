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
  loading: false, // GET-PENDING, CREATE-PENDING, etc...
  allUserTasks: [], // the data, success
  error: null // ERROR-GET, ERROR-CREATE, etc...
};

export default function reducer(state = initialState, action) {
  if (action.type === GET_TASKS_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === GET_TASKS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      allUserTasks: action.data,
      error: null
    });
  } else if (action.type === GET_TASKS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === CREATE_TASK_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === CREATE_TASK_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    });
  } else if (action.type === CREATE_TASK_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
};
