import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";

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


// CRUD for Admin (parent) user, and UPDATE for User (child)
export const createTask = ({ taskName, onTaskCreated }) => (dispatch, getState) => {
  // getState() is a Redux method
  const authToken = getState().auth.authToken;
  const familyCode = getState().auth.currentUser.familyCode;
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
    dispatch(getTasks(familyCode));
    onTaskCreated();
  })
};

