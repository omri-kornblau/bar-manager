import {
  POST_FILTERED_REQUESTS_SUCCESS, FETCH_REQUEST_SUCCESS, POST_SEND_MESSAGE_SUCCESS, POST_SET_OFFER_SUCCESS
} from "../actions/provider";

const initialState = {
  requests: [],
  filteredRequests: []
};

const createOffersFromOffer = (oldOffers, offer) => {
  let foundOffer = false;
  const newOffers = oldOffers.map(oldOffer => {
    if (offer.provider === offer.provider) {
      foundOffer = true;
      return offer;
    }
    return oldOffer;
  });

  if (!foundOffer) {
    return [...oldOffers, offer];
  }

  return newOffers;
}

const providerReducer = (state=initialState, action) => {
  switch(action.type) {
    case POST_FILTERED_REQUESTS_SUCCESS:
      return {
        ...state,
        filteredRequests: action.payload
      };

    case FETCH_REQUEST_SUCCESS:
      return {
        ...state,
        fetchedRequest: action.payload
      };

    case POST_SET_OFFER_SUCCESS:
      return state.fetchedRequest._id === action.payload.requestId
      ? {
        ...state,
        fetchedRequest: {
          ...state.fetchedRequest,
          myOffer: action.payload.offer,
          offers: createOffersFromOffer(state.fetechRequest.offers, action.payload.offer)
        }
      }
      : state
    case POST_SEND_MESSAGE_SUCCESS:
      return state.fetchedRequest._id === action.payload.requestId
      ? {
        ...state,
        fetchedRequest: {
          ...state.fetchedRequest,
          messages: [...state.fetchedRequest.messages, action.payload.message]
        }
      }
      : state

    default:
      return state;
  }
}

export default providerReducer;
