export const getProgresses = state => {
  return state.app.progressBar;
}

export const getProgress = (state, view) => {
  return state.app.progressBar[view] ? state.app.progressBar[view] : "waitingForApprovel"
}
