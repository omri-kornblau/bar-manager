import {
  GET_CLIENT_SUCCESS, ACCEPT_REQUEST_SUCCESS, CANCEL_REQUEST_SUCCESS, UPDATE_REQUEST_SUCCESS,
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
    case UPDATE_REQUEST_SUCCESS:
      return {
        ...state,
        requests: state.requests.map(request => (
          request._id === action.payload._id ? action.payload : request
        )),
      }
    case CANCEL_REQUEST_SUCCESS:
      return {
        ...state,
        requests: state.requests.filter(request => (
          request._id !== action.payload._id
        )),
      }
    default:
      return state;
  }
}

export default requestReducer;
