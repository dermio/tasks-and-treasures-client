import {
  createStore, applyMiddleware, combineReducers, compose
} from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";

import { loadAuthToken } from "./local-storage";
import authReducer from "./reducers/auth";
import protectedDataReducer from "./reducers/protected-data";
import tasksReducer from "./reducers/tasks";
import prizesReducer from "./reducers/prizes";

import { setAuthToken, refreshAuthToken } from "./actions/auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    protectedData: protectedDataReducer,
    tasks: tasksReducer,
    prizes: prizesReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;


/*
1. Move the RootReducer (combineReducers) back to the reducers folder?
2. Include Justin's Compose, and composeEnhancer for store.
*/
