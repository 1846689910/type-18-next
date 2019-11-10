import { combineReducers } from "redux";
import { ActionTypes } from "./actions";
export const initialState = {
  counter: { value: 0 }
};
const counter = (counter = initialState.counter, action) => {
  switch (action.type) {
    case ActionTypes.INCREASE:
      counter.value++;
      break;
    case ActionTypes.DECREASE:
      counter.value--;
      break;
  }
  return { ...counter };
};
export const reducer = combineReducers({
  counter
});
