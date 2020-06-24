export const getLoading = state => {
  return state.app.main.loading;
}

export const getRequests = state => {
  return state.app.main.client.requests;
}
