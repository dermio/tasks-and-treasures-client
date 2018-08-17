import {
  GET_PRIZE_REQUEST,
  GET_PRIZE_SUCCESS,
  GET_PRIZE_ERROR
} from "../actions/prizes";

const initialState = {
  pending_GET_prize: false,
  userPrize: null,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === GET_PRIZE_REQUEST) {
    return Object.assign({}, state, {
      pending_GET_prize: true
    });
  } else if (action.type === GET_PRIZE_SUCCESS) {
    return Object.assign({}, state, {
      pending_GET_prize: false,
      userPrize: action.data,
      error: null
    });
  } else if (action.type === GET_PRIZE_ERROR) {
    return Object.assign({}, state, {
      pending_GET_prize: false,
      error: action.error
    });
  }
  return state;
};
