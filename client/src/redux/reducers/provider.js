import {
  POST_FILTERED_REQUESTS_SUCCESS
} from "../actions/provider";

const initialState = {
  requests: [],
  filteredRequests: []
};

const providerReducer = (state=initialState, action) => {
  switch(action.type) {
    case POST_FILTERED_REQUESTS_SUCCESS:
      return {
        ...state,
        filteredRequests: action.payload
      };

    default:
      return state;
  }
}

export default providerReducer;
