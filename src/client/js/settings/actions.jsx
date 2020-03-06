import Promise from "bluebird";
export const ActionTypes = {
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
  DELAY_INCREASE: "DELAY_INCREASE",
  SET_COUNTER_ACTION: "SET_COUNTER_ACTION",
  SET_SELECT_OPTIONS_ACTION: "SET_SELECT_OPTIONS_ACTION",
  SET_SELECTED_OPTION_ACTION: "SET_SELECTED_OPTION_ACTION"
};
export const increase = (attr={}) => ({
  ...attr,
  type: ActionTypes.INCREASE
});
export const decrease = (attr={}) => ({
  ...attr,
  type: ActionTypes.DECREASE
});
export const delayIncrease = () => async(dispatch, getState) => {  // eslint-disable-line
  await Promise.delay(1000);
  dispatch(increase());
};
/**
 * 
 * @param {Number} data 
 */
export const setCounterAction = data => ({
  type: ActionTypes.SET_COUNTER_ACTION,
  data
});
/**
 * 
 * @param {Object[]} data 
 */
export const setSelectOptionsAction = data => ({
  type: ActionTypes.SET_SELECT_OPTIONS_ACTION,
  data
});
/**
 * 
 * @param {Object} data 
 */
export const setSelectedOptionAction = data => ({
  type: ActionTypes.SET_SELECTED_OPTION_ACTION,
  data
}); 
