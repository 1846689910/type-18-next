export const ActionTypes = {
  SET_COUNTER_ACTION: "SET_COUNTER_ACTION",
  SET_SELECT_OPTIONS_ACTION: "SET_SELECT_OPTIONS_ACTION",
  SET_SELECTED_OPTION_ACTION: "SET_SELECTED_OPTION_ACTION"
};
interface IAction<T>{
  type: string;
  data: T;
}

interface ISelectOption {
  value: string;
  label: string;
  color: string;
  isDisabled?: boolean;
  isFixed?: boolean;
}

export const setCounterAction = (data: number): IAction<number> => ({
  type: ActionTypes.SET_COUNTER_ACTION,
  data
});

export const setSelectOptionsAction = (data: ISelectOption[]): IAction<ISelectOption[]> => ({
  type: ActionTypes.SET_SELECT_OPTIONS_ACTION,
  data
});

export const setSelectedOptionAction = (data: ISelectOption[]): IAction<ISelectOption[]> => ({
  type: ActionTypes.SET_SELECTED_OPTION_ACTION,
  data
}); 
