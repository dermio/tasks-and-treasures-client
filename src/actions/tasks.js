import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";

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

export const updateTask = ({ id, taskName }) => (dispatch, getState) => {
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

};
