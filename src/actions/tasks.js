import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";
import { refreshCurrentUser } from "./auth";
import { getFamily } from "./family";

export const GET_TASKS_REQUEST = "GET_TASKS_REQUEST";
export const getTasksRequest = () => ({
  type: GET_TASKS_REQUEST
});

export const GET_TASKS_SUCCESS = "GET_TASKS_SUCCESS";
export const getTasksSuccess = data => ({
  type: GET_TASKS_SUCCESS,
  data
});

export const GET_TASKS_ERROR = "GET_TASKS_ERROR";
export const getTasksError = error => ({
  type: GET_TASKS_ERROR,
  error
});


/****************************
 * Justin, isEditing Tasks (and Prizes)
****************************/
export const SET_EDITING_TASK = 'SET_EDITING_TASK';
export const setEditingTask = (taskId, isEditing) => ({
  type: SET_EDITING_TASK,
  taskId,
  isEditing,
});
export const RESET_EDITING_TASKS = 'RESET_EDITING_TASKS';
export const resetEditingTasks = () => ({
  type: RESET_EDITING_TASKS
});

export const getTasks = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const familyCode = getState().auth.currentUser.familyCode;
  dispatch(getTasksRequest());
  return fetch(`${API_BASE_URL}/tasks/${familyCode}`, {
    method: "GET",
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((data) => dispatch(getTasksSuccess(data)))
  .catch(err => {
    dispatch(getTasksError(err));
  });
};


export const CREATE_TASK_REQUEST = "CREATE_TASK_REQUEST";
export const createTaskRequest = () => ({
  type: CREATE_TASK_REQUEST
});

export const CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS";
export const createTaskSuccess = data => ({
  type: CREATE_TASK_SUCCESS,
  data
});

export const CREATE_TASK_ERROR = "CREATE_TASK_ERROR";
export const createTaskError = error => ({
  type: CREATE_TASK_ERROR,
  error
});

export const createTask = ({ taskName, onTaskCreated }) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const familyCode = getState().auth.currentUser.familyCode;
  dispatch(createTaskRequest());
  return fetch(`${API_BASE_URL}/tasks/`, {
    method: "POST",
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ familyCode, taskName })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => {
    // Dispatch createTaskSuccess before dispatch getTasks
    dispatch(createTaskSuccess(res));
    dispatch(getTasks());
    dispatch(getFamily());
    onTaskCreated(); // Hide the create task form after creating task
  })
  .catch(err => {
    dispatch(createTaskError(err));
  });
};


export const DELETE_TASK_REQUEST = "DELETE_TASK_REQUEST";
export const deleteTaskRequest = () => ({
  type: DELETE_TASK_REQUEST
});

export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const deleteTaskSuccess = data => ({
  type: DELETE_TASK_SUCCESS,
  data
});

export const DELETE_TASK_ERROR = "DELETE_TASK_ERROR";
export const deleteTaskError = error => ({
  type: DELETE_TASK_ERROR,
  error
});

export const deleteTask = (id) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(deleteTaskRequest());
  return fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => {
    dispatch(deleteTaskSuccess(res));
    dispatch(getTasks());
    dispatch(getFamily());
  })
  .catch(err => {
    dispatch(deleteTaskError(err));
  });
};


export const UPDATE_TASK_REQUEST = "UPDATE_TASK_REQUEST";
export const updateTaskRequest = () => ({
  type: UPDATE_TASK_REQUEST
});

export const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS";
export const updateTaskSuccess = data => ({
  type: UPDATE_TASK_SUCCESS,
  data
});

export const UPDATE_TASK_ERROR = "UPDATE_TASK_ERROR";
export const updateTaskError = error => ({
  type: UPDATE_TASK_ERROR,
  error
});

export const updateTask = ({ id, taskName, onTaskUpdated }) => (dispatch, getState) => {
  console.log("UPDATE TASK THUNK");
  const authToken = getState().auth.authToken; //console.log(authToken);
  dispatch(updateTaskRequest());

  return fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    },
    // Need the taskName to update. How to get the taskName?
    body: JSON.stringify({ id, taskName })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => {
    dispatch(updateTaskSuccess(res));
    dispatch(getTasks());
    onTaskUpdated(); // Hide the update task form after updating task
  })
  .catch(err => {
    dispatch(updateTaskError(err));
  });
};


/* Thunk for when Child user checks box to complete Task */
/* I do NOT need to create `CHANGE_TASK_COMPLETION` Actions for Dispatch,
unless I want to. */
export const changeTaskCompletion = ({ id, completed }) => (
  dispatch, getState
) => {
  console.log("CHANGE TASK COMPLETED THUNK");
  const authToken = getState().auth.authToken; //console.log(authToken);

  console.log("[[[ {ID, COMPLETED} ]]]", {id, completed});

  return fetch(`${API_BASE_URL}/tasks/${id}/completed`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    },
    /* `completed` is a Boolean. It's dispatched when the Child user clicks
    the Task checkbox for completion. */
    body: JSON.stringify({ id, completed })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => {
    // dispatch(updateTaskSuccess(res));
    dispatch(getTasks());
  });
};


export const notifyParentTasksReadyForReview = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/tasks/request/review`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => {
    // no need to dispatch getTasks()

    // Really need to refresh User info, not necessarily refresh token
    dispatch(refreshCurrentUser());
  });
};


// Later create Sync Actions for GET_CHILD_STATUS Request and Error
export const GET_CHILD_STATUS_SUCCESS = "GET_CHILD_STATUS_SUCCESS";
export const getChildStatusSuccess = data => ({
  type: GET_CHILD_STATUS_SUCCESS,
  data
});

export const getChildStatus = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/tasks/children/status`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => dispatch(getChildStatusSuccess(data))) // create sync action
  .catch(err => {
    dispatch(getTasksError(err));
  });
};


/* Need to stop polling when logging out. This will prevent errors & crashing.
The thunk is dispatched from the LogoutButton component. */
export const stopPollGetChildStatus = () => (dispatch, getState) => {
  // if statement
  const intervalId = getState().tasks.pollGetChildStatusIntervalId;
  console.log("[[[ intervalId ]]]", intervalId);
  if (intervalId) {
    clearInterval(intervalId);
  }
}

/* Parent polls Child's state `tasksReadyForReview` in
`state.tasks.allChildStatus` for each Child user. It's part of the condition
to enable the button, to approve child tasks for the Parent. */
export const pollGetChildStatus = () => (dispatch, getState) => {
  dispatch(getChildStatus());
  const intervalId = setInterval(() => {
    dispatch(getChildStatus());
  }, 5000);

  // Eventually create action creator for dispatch.
  dispatch({
    type: "SET_INTERVAL_ID",
    intervalId
  });
};
