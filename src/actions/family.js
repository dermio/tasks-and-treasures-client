import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";
// import { refreshCurrentUser } from "./auth"; // might need this thunk later


// After get Family info, dispatch success with reponse
// to change active Family info on client
export const GET_FAMILY_SUCCESS = "GET_FAMILY_SUCCESS";
export const getFamilySuccess = family => ({
  type: GET_FAMILY_SUCCESS,
  family
});

export const getFamily = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const familyCode = getState().auth.currentUser.familyCode;

  return fetch(`${API_BASE_URL}/family/${familyCode}`, {
    method: "GET",
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(res => dispatch(getFamilySuccess(res.family))) // res.family is object
  .catch(err => {});
}


export const FINALIZE_TASKS_LIST_SUCCESS = "FINALIZE_TASKS_LIST_SUCCESS";
export const finalizeTasksListSuccess = family => ({
  type: FINALIZE_TASKS_LIST_SUCCESS
});

export const FINALIZE_TASKS_LIST_ERROR = "FINALIZE_TASKS_LIST_ERROR";
export const finalizeTasksListError = error => ({
  type: FINALIZE_TASKS_LIST_ERROR,
  error
});

export const finalizeTasksList = () => (dispatch, getState) => {
  console.log("[[[ THUNK, PUT, FINALIZE TASKS LIST ]]]");

  const authToken = getState().auth.authToken;
  const familyCode = getState().auth.currentUser.familyCode;

  return fetch(`${API_BASE_URL}/family/${familyCode}/finalize`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => {
    // dispatch(finalizeTasksListSuccess(res)); // optional
    dispatch(getFamily());
  })
  .catch(err => {
    dispatch(finalizeTasksListError(err));
  });
};
