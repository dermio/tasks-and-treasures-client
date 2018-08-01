import {
  FETCH_PRIZE_SUCCESS,
  FETCH_PRIZE_ERROR
} from "../actions/prizes";

const initialState = {
  userPrize: [],
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_PRIZE_SUCCESS) {
    return Object.assign({}, state, {
      userPrize: action.data,
      error: null
    });
  } else if (action.type === FETCH_PRIZE_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
};
