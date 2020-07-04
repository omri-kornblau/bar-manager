export const TRY_POST_FILTERED_REQUESTS = "TRY_POST_FILTERED_REQUESTS";
export const POST_FILTERED_REQUESTS_SUCCESS = "POST_FILTERED_REQUESTS_SUCCESS";
export const POST_FILTERED_REQUESTS_FAILURE = "POST_FILTERED_REQUESTS_FAILURE";

export const TRY_FETCH_REQUEST = "TRY_FETCH_REQUEST";
export const FETCH_REQUEST_SUCCESS = "FETCH_REQUEST_SUCCESS";
export const FETCH_REQUEST_FAILED = "FETCH_REQUEST_FAILED";

export const TRY_POST_SET_OFFER = "TRY_POST_SET_OFFER";
export const POST_SET_OFFER_SUCCESS = "POST_SET_OFFER_SUCCESS";
export const POST_SET_OFFER_FAILED = "POST_SET_OFFER_FAILED";

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

export const tryFetchRequest = () => ({
  type: TRY_FETCH_REQUEST,
});

export const fetchRequestSuccess = request => ({
  type: FETCH_REQUEST_SUCCESS,
  payload: request,
});

export const fetchRequestFailed = err => ({
  type: FETCH_REQUEST_FAILED,
  payload: { err },
});

export const tryPostSetOffer = requestId => ({
  type: TRY_POST_SET_OFFER,
  payload: {
    requestId,
  }
});

export const postSetOfferSuccess = (requestId, offer) => ({
  type: POST_SET_OFFER_SUCCESS,
  payload: {
    requestId,
    offer,
  }
});

export const postSetOfferFailed = requestId => ({
  type: POST_SET_OFFER_FAILED,
  payload: {
    requestId,
    err,
  },
});
