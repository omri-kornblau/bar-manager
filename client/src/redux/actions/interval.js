export const SET_INTERVALS = "SET_INTERVALS";

export const setIntervals = (intervals, intervalId, release) => ({
  type: SET_INTERVALS,
  payload: { intervals , intervalId, release}
});
