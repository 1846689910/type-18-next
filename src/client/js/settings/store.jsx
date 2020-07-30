import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducers";
import { initialState } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";

const configureStore = (preloadedState = initialState) =>
  createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk, logger)),
  );

let store;

export const initializeStore = (preloadedState) => {
  let _store = store ?? configureStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = configureStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  const isServer = typeof window === "undefined";
  if (isServer) return _store;

  // Create store if unavailable on the client and set it on the window object
  const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = configureStore(initialState);
  }
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(preloadedState = initialState) {
  const store = useMemo(() => initializeStore(preloadedState), [preloadedState]);
  return store;
}
