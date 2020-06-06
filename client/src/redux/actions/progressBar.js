export const SET_PROGRESSBAR = "SET_PROGRESSBAR";

export const setView = progress => ({
  type: SET_PROGRESSBAR,
  payload: { progress }
});
