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

export const getTasks = (familyCode) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
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
    // Dispatch create task success before dispatch get tasks
    dispatch(createTaskSuccess(res));
    dispatch(getTasks(familyCode));
    onTaskCreated();
  })
  .catch(err => {
    dispatch(createTaskError(err));
  });
};

