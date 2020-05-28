export const SET_STEP = "SET_STEP";

export const setStep = dispatch => step => dispatch({
  type: SET_STEP,
  payload: { step }
});
