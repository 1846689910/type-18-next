import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducers";
import { initialState } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const configureStore = (preloadedState = initialState) =>
  createStore(reducer, preloadedState, composeWithDevTools(applyMiddleware(thunk, logger)));
