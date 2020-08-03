import { combineReducers } from "redux";
import { ActionTypes, IAction, ISelectOption } from "./actions";

export const initialState = {
  counter: { value: 0 },
  selectOptions: {
    value: [],
  },
  selectedOption: {
    value: [],
  },
};

export interface IState<T> {
  value: T;
}

const counter = (
  counter = initialState.counter,
  action: IAction<number>,
): IState<number> => {
  if (action.type === ActionTypes.SET_COUNTER_ACTION) {
    counter.value = action.data;
  }
  return { ...counter };
};

const selectOptions = (
  selectOptions = initialState.selectOptions,
  action: IAction<ISelectOption[]>,
): IState<ISelectOption[]> => {
  if (action.type === ActionTypes.SET_SELECT_OPTIONS_ACTION) {
    selectOptions.value = action.data;
  }
  return { ...selectOptions };
};

const selectedOption = (
  selectedOption = initialState.selectedOption,
  action: IAction<ISelectOption[]>,
): IState<ISelectOption[]> => {
  if (action.type === ActionTypes.SET_SELECTED_OPTION_ACTION) {
    selectedOption.value = action.data;
  }
  return { ...selectedOption };
};

export const reducer = combineReducers({
  counter,
  selectOptions,
  selectedOption,
});
