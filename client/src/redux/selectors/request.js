import { getUserType } from "./user";

export const getLoading = state => {
  return state.app.errors.getClient.inProgress;
}

export const getCreateRequestLoading = state => {
  return state.app.errors.createRequest.inProgress;
}

export const getRequests = state => {
  const type = getUserType(state);
  return type ? state.app[type].requests : [];
}

export const getOpenedRequest = state => {
  return state.router.location.query.or
}

export const getRequestEditMode = state => {
  return state.router.location.query.em === "true"
}
