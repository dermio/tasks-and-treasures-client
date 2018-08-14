import {
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR
} from "../actions/tasks";

const initialState = {
  loading: false,
  allUserTasks: [], // the data, success
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === GET_TASKS_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  }
  if (action.type === GET_TASKS_SUCCESS) {
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
  }
  return state;
};
