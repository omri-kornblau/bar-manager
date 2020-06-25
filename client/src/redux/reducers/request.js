import {
  GET_CLIENT_SUCCESS,
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

    default:
      return state;
  }
}

export default requestReducer;
