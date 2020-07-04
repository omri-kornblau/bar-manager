
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  TRY_LOGIN
} from "../actions/login";
import {
  TRY_GET_CLIENT,
  GET_CLIENT_SUCCESS,
  GET_CLIENT_FAILURE,
  TRY_CREATE_REQUEST,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_FAILURE,
  TRY_UPDATE_REQUEST,
  UPDATE_REQUEST_SUCCESS,
  UPDATE_REQUEST_FAILURE,
  TRY_ACCEPT_REQUEST,
  ACCEPT_REQUEST_SUCCESS,
  ACCEPT_REQUEST_FAILURE,
  TRY_CANCEL_REQUEST,
  CANCEL_REQUEST_SUCCESS,
  CANCEL_REQUEST_FAILURE,
} from "../actions/request";
import {
  TRY_POST_FILTERED_REQUESTS,
  POST_FILTERED_REQUESTS_SUCCESS,
  POST_FILTERED_REQUESTS_FAILURE,
  TRY_FETCH_REQUEST,
  FETCH_REQUEST_SUCCESS,
  FETCH_REQUEST_FAILED,
  TRY_POST_SEND_MESSAGE,
  POST_SEND_MESSAGE_SUCCESS
} from "../actions/provider";

const initialState = {
  login: {
    inProgress: false,
    try: false,
    error: undefined
  },
  getClient: {
    inProgress: false,
    try: false,
    error: undefined
  },
  createRequest: {
    inProgress: false,
    try: false,
    error: undefined
  },
  updateRequest: {
    inProgress: false,
    try: false,
    error: undefined
  },
  postFilteredRequests: {
    inProgress: false,
    try: false,
    error: undefined
  },
  acceptRequest: {},
  cancelRequest: {},
};

const reduceFetch = (prop, TRY, SUCCESS, FAILURE) => (state, action) => {
  switch(action.type) {
    case TRY:
      return {
        ...state,
        [prop]: {
          inProgress: true,
          try: true,
          error: undefined,
        }
      }

    case SUCCESS:
      return {
        ...state,
        [prop]: {
          inProgress: false,
          try: true,
          error: undefined,
        }
      }

    case FAILURE:
      return {
        ...state,
        [prop]: {
          try: true,
          inProgress: false,
          error: action.payload.err
        }
      }

    default:
      return state
  }
}

const reduceRowFetch = (prop, TRY, SUCCESS, FAILURE) => (state, action) => {
  switch(action.type) {
    case TRY:
      return {
        ...state,
        [prop]: {
          ...state[prop],
          [action.payload._id]: {
            inProgress: true,
            try: true,
            error: undefined,
          }
        }
      }

    case SUCCESS:
      return {
        ...state,
        [prop]: {
          ...state[prop],
          [action.payload._id]: {
            inProgress: false,
            try: true,
            error: undefined,
          }
        }
      }

    case FAILURE:
      return {
        ...state,
        [prop]: {
          ...state[prop],
          [action.payload._id]: {
            try: true,
            inProgress: false,
            error: action.payload.err
          }
        }
      }

    default:
      return state
  }
}

const userReducer = (state=initialState, action) => {
  const fetchReducers = [
    reduceFetch("login", TRY_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE),
    reduceFetch("getClient", TRY_GET_CLIENT, GET_CLIENT_SUCCESS, GET_CLIENT_FAILURE),
    reduceFetch("createRequest", TRY_CREATE_REQUEST, CREATE_REQUEST_SUCCESS, CREATE_REQUEST_FAILURE),
    reduceFetch("updateRequest", TRY_UPDATE_REQUEST, UPDATE_REQUEST_SUCCESS, UPDATE_REQUEST_FAILURE),
    reduceFetch("postFilteredRequests", TRY_POST_FILTERED_REQUESTS, POST_FILTERED_REQUESTS_SUCCESS, POST_FILTERED_REQUESTS_FAILURE),
    reduceFetch("fetchRequest", TRY_FETCH_REQUEST, FETCH_REQUEST_SUCCESS, FETCH_REQUEST_FAILED),
    reduceFetch("postSetOffer", TRY_POST_SET_OFFER, POST_SET_OFFER_SUCCESS, POST_SET_OFFER_FAILED),
    reduceFetch("postSendMessage", TRY_POST_SEND_MESSAGE, POST_SEND_MESSAGE_SUCCESS, POST_SEND_MESSAGE_SUCCESS),
    reduceRowFetch("acceptRequest", TRY_ACCEPT_REQUEST, ACCEPT_REQUEST_SUCCESS, ACCEPT_REQUEST_FAILURE),
    reduceRowFetch("cancelRequest", TRY_CANCEL_REQUEST, CANCEL_REQUEST_SUCCESS, CANCEL_REQUEST_FAILURE),
  ]

  return fetchReducers.reduce((currentState, reducer) =>
    reducer(currentState, action)
  , state)
}

export default userReducer;
