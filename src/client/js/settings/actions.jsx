export const ActionTypes = {
  SET_COUNTER_ACTION: "SET_COUNTER_ACTION",
  SET_SELECT_OPTIONS_ACTION: "SET_SELECT_OPTIONS_ACTION",
  SET_SELECTED_OPTION_ACTION: "SET_SELECTED_OPTION_ACTION"
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
