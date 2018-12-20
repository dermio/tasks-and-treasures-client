import {
  GET_FAMILY_SUCCESS
} from "../actions/family";

const initialState = {};

export default function reducer(state=initialState, action) {
  if (action.type === GET_FAMILY_SUCCESS) {
    /* action.family is the family document (object) returned from
    the GET request to /family/:familyCode. */
    return Object.assign({}, state, action.family);
  }
  return state;
}


/*
For now, restrict adding Tasks. Once tasks are finalized, true ??
*/
