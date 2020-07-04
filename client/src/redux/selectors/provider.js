export const getFilteredRequests = state => {
  return state.app.provider.filteredRequests;
}

export const getFetchedRequest = state => {
  return state.app.provider.fetchedRequest;
}
