import {
  FETCH_PROTECTED_DATA_SUCCESS,
  FETCH_PROTECTED_DATA_ERROR
} from "../actions/protected-data";

const initialState = {
  data: "",
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
    return Object.assign({}, state, {
      data: action.data,
      error: null
    });
  } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
};

/* Add more action.types to the Reducer for the CRUD for Admin (parent),
and UPDATE for User (child) */

/* NOTE: The Thinkful example has the RootReducer in the store.
There is NO index.js that contains the RootReducer. */
