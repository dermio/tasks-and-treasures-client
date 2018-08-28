import {
  GET_PRIZE_REQUEST,
  GET_PRIZE_SUCCESS,
  GET_PRIZE_ERROR,
  CREATE_PRIZE_REQUEST,
  CREATE_PRIZE_SUCCESS,
  CREATE_PRIZE_ERROR,
  DELETE_PRIZE_REQUEST,
  DELETE_PRIZE_SUCCESS,
  DELETE_PRIZE_ERROR
} from "../actions/prizes";

const initialState = {
  pending_GET_prize: false,
  error_GET_prize: false,
  pending_CREATE_prize: false,
  error_CREATE_prize: false,
  pending_DELETE_prize: false,
  error_DELETE_prize: false,
  userPrize: null // the data, success
};

export default function reducer(state = initialState, action) {
  if (action.type === GET_PRIZE_REQUEST) {
    return Object.assign({}, state, {
      pending_GET_prize: true
    });
  } else if (action.type === GET_PRIZE_SUCCESS) {
    console.log("[[[ PRIZES REDUCER ]]]", action.data);
    return Object.assign({}, state, {
      pending_GET_prize: false,
      userPrize: action.data,
      error_GET_prize: false
    });
  } else if (action.type === GET_PRIZE_ERROR) {
    return Object.assign({}, state, {
      pending_GET_prize: false,
      error_GET_prize: action.error
    });
  } else if (action.type === CREATE_PRIZE_REQUEST) {
    return Object.assign({}, state, {
      pending_CREATE_prize: true
    });
  } else if (action.type === CREATE_PRIZE_SUCCESS) {
    return Object.assign({}, state, {
      pending_CREATE_prize: false,
      error_CREATE_prize: false
    });
  } else if (action.type === CREATE_PRIZE_ERROR) {
    return Object.assign({}, state, {
      pending_CREATE_prize: false,
      error_CREATE_prize: action.error
    });
  } else if (action.type === DELETE_PRIZE_REQUEST) {
    console.log("[[[ REDUCER, DELETE PRIZE REQUEST ]]]");
    return Object.assign({}, state, {
      pending_DELETE_prize: true
    });
  } else if (action.type === DELETE_PRIZE_SUCCESS) {
    return Object.assign({}, state, {
      pending_DELETE_prize: false,
      error_DELETE_prize: false
    });
  } else if (action.type === DELETE_PRIZE_ERROR) {
    return Object.assign({}, state, {
      pending_DELETE_prize: false,
      error_DELETE_prize: action.error
    });
  }
  return state;
};
