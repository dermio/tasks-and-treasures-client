import {
  GET_TASKS_ERROR,
  GET_TASKS_SUCCESS
} from "../actions/tasks";

const initialState = {
  allUserTasks: [],
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === GET_TASKS_SUCCESS) {
    return Object.assign({}, state, {
      allUserTasks: action.data,
      error: null
    });
  } else if (action.type === GET_TASKS_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
};
