import {
  POST_FILTERED_REQUESTS_SUCCESS,
  FETCH_REQUEST_SUCCESS,
  POST_SEND_MESSAGE_SUCCESS,
  POST_SET_OFFER_SUCCESS,
  GET_PROVIDER_SUCCESS,
} from "../actions/provider";

const initialState = {
  requests: [],
  filteredRequests: [],
  totalRequests: 0,
};

const createOffersFromOffer = (oldOffers, offer) => {
  let foundOffer = false;
  const newOffers = oldOffers.map(oldOffer => {
    if (oldOffer.provider === offer.provider) {
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
    case GET_PROVIDER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case POST_FILTERED_REQUESTS_SUCCESS:
      return {
        ...state,
        filteredRequests: action.payload.requests,
        totalRequests: action.payload.totalRequests,
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
          offers: createOffersFromOffer(state.fetchedRequest.offers, action.payload.offer)
        },
        requests: [
          ...state.requests,
          {
            ...state.fetchedRequest,
            offers: createOffersFromOffer(state.fetchedRequest.offers, action.payload.offer)
          }
        ],
        filteredRequests: state.filteredRequests.filter(request =>
          request._id !== action.payload.requestId
        ),
        totalRequests: state.totalRequests - 1,
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
