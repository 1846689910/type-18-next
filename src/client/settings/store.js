import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducers";
import { initialState } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const initializeStore = (preloadedState = initialState) =>
  createStore(reducer, preloadedState, composeWithDevTools(applyMiddleware(thunk)));
