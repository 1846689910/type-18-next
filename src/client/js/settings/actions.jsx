import Promise from "bluebird";
export const ActionTypes = {
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
  DELAY_INCREASE: "DELAY_INCREASE"
};
export const increase = (attr={}) => ({
  ...attr,
  type: ActionTypes.INCREASE
});
export const decrease = (attr={}) => ({
  ...attr,
  type: ActionTypes.DECREASE
});
export const delayIncrease = () => async(dispatch, getState) => {
  await Promise.delay(1000);
  dispatch(increase());
}