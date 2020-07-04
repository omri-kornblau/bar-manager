export const TRY_POST_FILTERED_REQUESTS = "TRY_POST_FILTERED_REQUESTS";
export const POST_FILTERED_REQUESTS_SUCCESS = "POST_FILTERED_REQUESTS_SUCCESS";
export const POST_FILTERED_REQUESTS_FAILURE = "POST_FILTERED_REQUESTS_FAILURE";

export const tryPostFilteredRequests = () => ({
  type: TRY_POST_FILTERED_REQUESTS,
});

export const postFilteredRequestsSuccess = requests => ({
  type: POST_FILTERED_REQUESTS_SUCCESS,
  payload: requests,
});

export const postFilteredRequestsFailure = err => ({
  type: POST_FILTERED_REQUESTS_FAILURE,
  payload: { err },
});
