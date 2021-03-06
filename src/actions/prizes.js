import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./utils";

import { getChildStatus } from "./tasks";
import { refreshCurrentUser } from "./auth";

// Clear interval
import { updateChildInterval } from "./auth";
import { getFamily } from "./family";

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
    console.log("[[[ getPrize thunk, GET_PRIZE_SUCCESS ]]]", data);
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

export const createOrUpdatePrize = ({ prizeName, onPrizeCreated }) => (dispatch, getState) => {
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
    // Dispatch createPrizeSuccess before dispatch getPrize
    dispatch(createPrizeSuccess(res));
    dispatch(getPrize());
    dispatch(getFamily())
    onPrizeCreated(); // Hide the create prize form after creating prize
  })
  .catch(err => {
    dispatch(createPrizeError(err));
  })
};


export const DELETE_PRIZE_REQUEST = "DELETE_PRIZE_REQUEST";
export const deletePrizeRequest = () => ({
  type: DELETE_PRIZE_REQUEST
});

export const DELETE_PRIZE_SUCCESS = "DELETE_PRIZE_SUCCESS";
export const deletePrizeSuccess = data => ({
  type: DELETE_PRIZE_SUCCESS,
  data
});

export const DELETE_PRIZE_ERROR = "DELETE_PRIZE_ERROR";
export const deletePrizeError = error => ({
  type: DELETE_PRIZE_ERROR,
  error
});

export const deletePrize = id => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(deletePrizeRequest());
  return fetch(`${API_BASE_URL}/prizes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => {
    dispatch(deletePrizeSuccess(res));
    dispatch(getPrize());
    dispatch(getFamily());
  })
  .catch(err => {
    dispatch(deletePrizeError(err));
  });
};


// Might need awardChildPrize Request, Success, Error action creators
export const awardChildPrize = child => (dispatch, getState) => {
  console.log("[[[ awardChildPrize THUNK ]]]", child);
  const authToken = getState().auth.authToken;

  // Modified typical PUT request to NOT need an Id (no Child Id needed)
  return fetch(`${API_BASE_URL}/prizes/current/award`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ child })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => {
    dispatch(getChildStatus())
  })
  .catch(err => {
    // dispatch(deletePrizeError(err));
  });
};


export const rejectChildPrize = child => (dispatch, getState) => {
  console.log("[[[ rejectChildPrize THUNK ]]]", child);
  const authToken = getState().auth.authToken;

  // Modified typical PUT request to NOT need an Id (no Child Id needed)
  return fetch(`${API_BASE_URL}/prizes/current/reject`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ child })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => {
    dispatch(getChildStatus())
  })
  .catch(err => {
    // dispatch(deletePrizeError(err));
  });
};


/* If a Child user is logged in, the setInterval function is called.
If the Child user has property `tasksReadyForReview` of True,
refreshCurrentUser() is repeatedly called. Question: Why need to refresh?
Answer: To get updated current user info, specifically the property
`tasksReadyForReview` of the user, and maybe some other stuff. */
export const pollForPrizeStatus = child => (dispatch, getState) => {
  const state = getState();
  let childInt;
  if (
    state &&
    state.auth &&
    state.auth.currentUser &&
    state.auth.currentUser.role === "child"
  ) {
    childInt = setInterval(() => {
      console.log("CHECKING TO SEE IF CALL REFRESH AUTH TOKEN");
      // Child clicked button, their Tasks are ready for review.
      if (getState().auth.currentUser.tasksReadyForReview) {
        /* Child `tasksReadyForReview` property is true. Periodically
        get updated User info from the backend. */
        dispatch(refreshCurrentUser());
      }
    }, 5000);
    console.log("[[[ myInterval ]]]", childInt);
    dispatch(updateChildInterval(childInt));
  }
};
