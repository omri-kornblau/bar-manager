import {
  GET_CLIENT_SUCCESS, ACCEPT_REQUEST_SUCCESS, CANCEL_REQUEST_SUCCESS,
} from "../actions/request";

const initialState = {
  client: {
    requests: [],
    oldRequests: [],
    notifcations: [],
  }
};

const requestReducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_CLIENT_SUCCESS:
      return {
        ...state,
        client: action.payload
      };
    case ACCEPT_REQUEST_SUCCESS:
      return {
        ...state,
        client: {
          ...state.client,
          requests: state.client.requests.map( request => {
            return request._id === action.payload._id ? action.payload : request
          }
          ),
        },
      }
    case CANCEL_REQUEST_SUCCESS:
      return {
        ...state,
        client: {
          ...state.client,
          requests: state.client.requests.filter( request => {
            return request._id !== action.payload._id
          }
          ),
        },
      }
    default:
      return state;
  }
}

export default requestReducer;
