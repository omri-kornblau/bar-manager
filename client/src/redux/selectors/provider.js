export const getFilteredRequests = state => {
  return state.app.provider.filteredRequests;
}

export const getTotalRequests = state => {
  return state.app.provider.totalRequests;
}

export const getFetchedRequest = state => {
  return state.app.provider.fetchedRequest;
}
