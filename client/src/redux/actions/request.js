export const TRY_GET_CLIENT = "TRY_GET_CLIENT";
export const GET_CLIENT_SUCCESS = "GET_CLIENT_SUCCESS";
export const GET_CLIENT_FAILURE = "GET_CLIENT_FAILURE";

export const TRY_CREATE_REQUEST = "TRY_CREATE_REQUEST";
export const CREATE_REQUEST_SUCCESS = "CREATE_REQUEST_SUCCESS";
export const CREATE_REQUEST_FAILURE = "CREATE_REQUEST_FAILURE";

export const TRY_UPDATE_REQUEST = "TRY_UPDATE_REQUEST";
export const UPDATE_REQUEST_SUCCESS = "UPDATE_REQUEST_SUCCESS";
export const UPDATE_REQUEST_FAILURE = "UPDATE_REQUEST_FAILURE";

export const TRY_ACCEPT_REQUEST = "TRY_ACCEPT_REQUEST";
export const ACCEPT_REQUEST_SUCCESS = "ACCEPT_REQUEST_SUCCESS";
export const ACCEPT_REQUEST_FAILURE = "ACCEPT_REQUEST_FAILURE";

export const TRY_CANCEL_REQUEST = "TRY_CANCEL_REQUEST";
export const CANCEL_REQUEST_SUCCESS = "ACCEPT_CANCEL_SUCCESS";
export const CANCEL_REQUEST_FAILURE = "ACCEPT_CANCEL_FAILURE";

export const TRY_POST_SEND_MESSAGE_CLIENT = "TRY_POST_SEND_MESSAGE_CLIENT";
export const POST_SEND_MESSAGE_SUCCESS_CLIENT = "POST_SEND_MESSAGE_SUCCESS_CLIENT";
export const POST_SEND_MESSAGE_FAILURE_CLIENT = "POST_SEND_MESSAGE_FAILURE_CLIENT";

export const TRY_GET_MESSAGES = "TRY_GET_MESSAGES";
export const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS";
export const GET_MESSAGES_FAILURE = "GET_MESSAGES_FAILURE";

export const tryGetClient = () => ({
  type: TRY_GET_CLIENT,
});

export const getClientSuccess = client => ({
  type: GET_CLIENT_SUCCESS,
  payload: client,
});

export const getClientFailure = err => ({
  type: GET_CLIENT_FAILURE,
  payload: { err },
});

export const tryCreateRequest = () => ({
  type: TRY_CREATE_REQUEST,
});

export const createRequestSuccess = request => ({
  type: CREATE_REQUEST_SUCCESS,
  payload: request,
});

export const createRequestFailure = err => ({
  type: CREATE_REQUEST_FAILURE,
  payload: { err },
});

export const tryUpdateRequest = () => ({
  type: TRY_UPDATE_REQUEST,
});

export const updateRequestSuccess = (request, _id) => ({
  type: UPDATE_REQUEST_SUCCESS,
  payload: {
    _id,
    ...request,
  }
});

export const updateRequestFailure = err => ({
    type: UPDATE_REQUEST_FAILURE,
    payload: { err },
});

export const tryAcceptRequest = request => ({
  type: TRY_ACCEPT_REQUEST,
  payload: request
});

export const acceptRequestSuccess = request => ({
  type: ACCEPT_REQUEST_SUCCESS,
  payload: request,
});

export const acceptRequestFailure = (request, err) => ({
  type: ACCEPT_REQUEST_FAILURE,
  payload: { ...request, err },
});

export const tryCancelRequest = request => ({
  type: TRY_CANCEL_REQUEST,
  payload: request
});

export const canceleRequestSuccess = request => ({
  type: CANCEL_REQUEST_SUCCESS,
  payload: request,
});

export const canceleRequestFailure = (request, err) => ({
  type: CANCEL_REQUEST_FAILURE,
  payload: { ...request, err },
});

export const tryPostSendMessage = requestId => ({
  type: TRY_POST_SEND_MESSAGE_CLIENT,
  payload: {
    requestId,
  }
});

export const postSendMessageSuccess = (requestId, providerId, message) => ({
  type: POST_SEND_MESSAGE_SUCCESS_CLIENT,
  payload: {
    requestId,
    providerId,
    message,
  }
});

export const postSendMessageFailed = err => ({
  type: POST_SEND_MESSAGE_FAILURE_CLIENT,
  payload: {
    err,
  },
});

export const tryGetMessages = requestId => ({
  type: TRY_GET_MESSAGES,
  payload: {
    requestId,
  }
});

export const getMessagesSuccess = (messages, requestId) => ({
  type: GET_MESSAGES_SUCCESS,
  payload: {
    requestId,
    messages,
  }
});

export const getMessagesFailure = err => ({
  type: GET_MESSAGES_FAILURE,
  payload: { err, },
});
