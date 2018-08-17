import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";

export const GET_PRIZE_SUCCESS = "GET_PRIZE_SUCCESS";
export const fetchPrizeSuccess = data => ({
  type: GET_PRIZE_SUCCESS,
  data
});

export const FETCH_PRIZE_ERROR = "FETCH_PRIZE_ERROR";
export const fetchPrizeError = error => ({
  type: FETCH_PRIZE_ERROR,
  error
});

export const fetchPrize = (familyCode) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/prizes/${familyCode}`, {
    method: "GET",
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => {
    console.log(res)
    return res.json()
  })
  .then((data) => {
    console.log(data)
    dispatch(fetchPrizeSuccess(data[0]))
  })
  .catch(err => {
    dispatch(fetchPrizeError(err));
  });
};


// CRUD for Admin (parent) user, and UPDATE for User (child)
