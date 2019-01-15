import {
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
  SET_EDITING_TASK,

  GET_CHILD_STATUS_SUCCESS // need GET_CHILD_STATUS Request and Error
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
  pending_DELETE_task: false,
  error_DELETE_task: false,
  pending_UPDATE_task: false,
  error_UPDATE_task: false,
  allUserTasks: [], // the data, success

  allChildStatus: [],
  tasksBeingEdited: {}
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
  } else if (action.type === DELETE_TASK_REQUEST) {
    return Object.assign({}, state, {
      pending_DELETE_task: true
    });
  } else if (action.type === DELETE_TASK_SUCCESS) {
    return Object.assign({}, state, {
      pending_DELETE_task: false,
      error_DELETE_task: false
    });
  } else if (action.type === DELETE_TASK_ERROR) {
    return Object.assign({}, state, {
      pending_DELETE_task: false,
      error_DELETE_task: action.error
    });
  } else if (action.type === UPDATE_TASK_REQUEST) {
    return Object.assign({}, state, {
      pending_UPDATE_task: true
    });
  } else if (action.type === UPDATE_TASK_SUCCESS) {
    return Object.assign({}, state, {
      pending_UPDATE_task: false,
      error_UPDATE_task: false
    });
  } else if (action.type === UPDATE_TASK_ERROR) {
    return Object.assign({}, state, {
      pending_UPDATE_task: false,
      error_UPDATE_task: action.error
    });


    /****************************
     * Justin, isEditing Tasks (and Prizes)
    ****************************/
  } else if (action.type === SET_EDITING_TASK) {
    console.log("[[[ SET EDITING TASK ]]]", action.taskId, action.isEditing)
    return Object.assign({}, state, {
      tasksBeingEdited: {
        [action.taskId]: action.isEditing
      }
    });
  }



  else if (action.type === GET_CHILD_STATUS_SUCCESS) {
    return Object.assign({}, state, {
      allChildStatus: action.data.users
    })
  }
  else if (action.type === "SET_INTERVAL_ID") {
    return Object.assign({}, state, {
      pollGetChildStatusIntervalId: action.intervalId
    })
  }
  return state;
};
