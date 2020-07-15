export const TRY_GET_PROVIDER = "TRY_GET_PROVIDER";
export const GET_PROVIDER_SUCCESS = "GET_PROVIDER_SUCCESS";
export const GET_PROVIDER_FAILED = "GET_PROVIDER_FAILED";

export const TRY_POST_FILTERED_REQUESTS = "TRY_POST_FILTERED_REQUESTS";
export const POST_FILTERED_REQUESTS_SUCCESS = "POST_FILTERED_REQUESTS_SUCCESS";
export const POST_FILTERED_REQUESTS_FAILURE = "POST_FILTERED_REQUESTS_FAILURE";

export const TRY_FETCH_REQUEST = "TRY_FETCH_REQUEST";
export const FETCH_REQUEST_SUCCESS = "FETCH_REQUEST_SUCCESS";
export const FETCH_REQUEST_FAILED = "FETCH_REQUEST_FAILED";

export const TRY_POST_SET_OFFER = "TRY_POST_SET_OFFER";
export const POST_SET_OFFER_SUCCESS = "POST_SET_OFFER_SUCCESS";
export const POST_SET_OFFER_FAILED = "POST_SET_OFFER_FAILED";

export const TRY_POST_SEND_MESSAGE = "TRY_POST_SEND_MESSAGE";
export const POST_SEND_MESSAGE_SUCCESS = "POST_SEND_MESSAGE_SUCCESS";
export const POST_SEND_MESSAGE_FAILURE = "POST_SEND_MESSAGE_FAILURE";

export const tryGetProvider = ()=> ({
  type: TRY_GET_PROVIDER,
});

export const getProviderSuccess = provider => ({
  type: GET_PROVIDER_SUCCESS,
  payload: provider,
});

export const getProviderFailed = () => ({
  type: GET_PROVIDER_FAILED,
});

export const tryPostFilteredRequests = () => ({
  type: TRY_POST_FILTERED_REQUESTS,
});

export const postFilteredRequestsSuccess = data => ({
  type: POST_FILTERED_REQUESTS_SUCCESS,
  payload: data,
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

export const postSetOfferFailed = err => ({
  type: POST_SET_OFFER_FAILED,
  payload: {
    err,
  },
});

export const tryPostSendMessage = requestId => ({
  type: TRY_POST_SEND_MESSAGE,
  payload: {
    requestId,
  }
});

export const postSendMessageSuccess = (requestId, message) => ({
  type: POST_SEND_MESSAGE_SUCCESS,
  payload: {
    requestId,
    message,
  }
});

export const postSendMessageFailed = err => ({
  type: POST_SEND_MESSAGE_FAILURE,
  payload: {
    err,
  },
});
