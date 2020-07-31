import {
  getClientData,
} from "../redux/thunks/client"

import {
  getProviderData,
  fetchRequest,
  filterRequests,
} from "../redux/thunks/provider"

export const REFRESH_INTERVAL = 2000; // 2 secs

export const GET_CLIENT = "getClient";
export const GET_PROVIDER = "getProvider";
export const GET_FETCHED_REQUEST = "getFetchedRequest";
export const GET_FILTERED_REQUESTS = "getFilteredRequests";

export const intervals = {
  [GET_CLIENT]: getClientData,
  [GET_PROVIDER]: getProviderData,
  [GET_FETCHED_REQUEST]: fetchRequest,
  [GET_FILTERED_REQUESTS]: filterRequests,
};
