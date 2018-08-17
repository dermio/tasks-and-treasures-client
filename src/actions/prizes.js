import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";

export const GET_PRIZE_SUCCESS = "GET_PRIZE_SUCCESS";
export const getPrizeSuccess = data => ({
  type: GET_PRIZE_SUCCESS,
  data
});

export const GET_PRIZE_ERROR = "GET_PRIZE_ERROR";
export const getPrizeError = error => ({
  type: GET_PRIZE_ERROR,
  error
});

export const getPrize = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const familyCode = getState().auth.currentUser.familyCode;
  return fetch(`${API_BASE_URL}/prizes/${familyCode}`, {
    method: "GET",
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((data) => dispatch(getPrizeSuccess(data[0])))
  .catch(err => {
    dispatch(getPrizeError(err));
  });
};


// CRUD for Admin (parent) user, and UPDATE for User (child)
