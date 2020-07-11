import {
  GET_CLIENT_SUCCESS,
  ACCEPT_REQUEST_SUCCESS,
  CANCEL_REQUEST_SUCCESS,
  UPDATE_REQUEST_SUCCESS,
  POST_SEND_MESSAGE_SUCCESS_CLIENT
} from "../actions/request";

const initialState = {
  requests: [],
  oldRequests: [],
};

const requestReducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_CLIENT_SUCCESS:
      return {
        ...state,
        requests: action.payload.requests,
        oldRequests: action.payload.oldRequests,
      };
    case ACCEPT_REQUEST_SUCCESS:
      return {
        ...state,
        requests: state.requests.map(request => (
          request._id === action.payload._id ? {
            ...request,
            firstAccept: action.payload.firstAccept,
            secondAccept: action.payload.secondAccept,
            status: action.payload.status,
          }
          : request
        )),
      }

    case UPDATE_REQUEST_SUCCESS:
      return {
        ...state,
        requests: state.requests.map(request => (
          request._id === action.payload._id ? {
            ...request,
            ...action.payload
          }
          : request
        )),
      }
    case CANCEL_REQUEST_SUCCESS:
      return {
        ...state,
        requests: state.requests.filter(request => (
          request._id !== action.payload._id
        )),
      }
    case POST_SEND_MESSAGE_SUCCESS_CLIENT:
      return {
        ...state,
        requests: state.requests.map(request => {
          const { message, requestId, providerId} = action.payload;
          const { messages } = request;
          return request._id === requestId
          ? {
            ...request,
            messages: {
              ...messages,
              [providerId]: [
                messages[providerId][0],
                [...messages[providerId][1], message]
              ]
            }
          }
          : request
        })
      }

    default:
      return state;
  }
}

export default requestReducer;
