import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";

export const GET_PRIZE_REQUEST = "GET_PRIZE_REQUEST";
export const getPrizeRequest = () => ({
  type: GET_PRIZE_REQUEST
});

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
  dispatch(getPrizeRequest());
  return fetch(`${API_BASE_URL}/prizes/${familyCode}`, {
    method: "GET",
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => {
    console.log("GET_PRIZE_SUCCESS", data);
    dispatch(getPrizeSuccess(data));
  })
  .catch(err => {
    dispatch(getPrizeError(err));
  });
};


export const CREATE_PRIZE_REQUEST = "CREATE_PRIZE_REQUEST";
export const createPrizeRequest = () => ({
  type: CREATE_PRIZE_REQUEST
});

export const CREATE_PRIZE_SUCCESS = "CREATE_PRIZE_SUCCESS";
export const createPrizeSuccess = data => ({
  type: CREATE_PRIZE_SUCCESS,
  data
});

export const CREATE_PRIZE_ERROR = "CREATE_PRIZE_ERROR";
export const createPrizeError = error => ({
  type: CREATE_PRIZE_ERROR,
  error
});

export const createPrize = ({ prizeName }) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const familyCode = getState().auth.currentUser.familyCode;
  dispatch(createPrizeRequest());
  return fetch(`${API_BASE_URL}/prizes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ familyCode, prizeName })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => {
    console.log(res); // cannot LOG
    return res.json();
  })
  .then(data => {
    dispatch(createPrizeSuccess(data));
    dispatch(getPrize());
  })
  .catch(err => {
    dispatch(createPrizeError(err));
  })
};
