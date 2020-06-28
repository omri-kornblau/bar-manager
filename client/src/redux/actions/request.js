export const TRY_GET_CLIENT = "TRY_GET_CLIENT";
export const GET_CLIENT_SUCCESS = "GET_CLIENT_SUCCESS";
export const GET_CLIENT_FAILURE = "GET_CLIENT_FAILURE";

export const TRY_CREATE_REQUEST = "TRY_CREATE_REQUEST";
export const CREATE_REQUEST_SUCCESS = "CREATE_REQUEST_SUCCESS";
export const CREATE_REQUEST_FAILURE = "CREATE_REQUEST_FAILURE";

export const TRY_UPDATE_REQUEST = "TRY_UPDATE_REQUEST";
export const UPDATE_REQUEST_SUCCESS = "UPDATE_REQUEST_SUCCESS";
export const UPDATE_REQUEST_FAILURE = "UPDATE_REQUEST_FAILURE";

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

export const updateRequestSuccess = request => ({
  type: UPDATE_REQUEST_SUCCESS,
  payload: request,
});

export const updateRequestFailure = err => {
  return ({
    type: UPDATE_REQUEST_FAILURE,
    payload: { err },
  });
}