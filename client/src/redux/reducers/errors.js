import {
  TRY_SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../actions/signup";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  TRY_LOGIN,
  TRY_CHECKTOKEN,
  CHECKTOKEN_SUCCESS,
  CHECKTOKEN_FAILURE
} from "../actions/login";
import {
  TRY_CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  TRY_UPDATE_USER_DETAILES,
  UPDATE_USER_DETAILES_SUCCESS,
  UPDATE_USER_DETAILES_FAILURE,
  TRY_UPDATE_NOTIFICATIONS_SETTINGS,
  UPDATE_NOTIFICATIONS_SETTINGS_SUCCESS,
  UPDATE_NOTIFICATIONS_SETTINGS_FAILURE,
} from "../actions/settings";
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
  TRY_POST_SEND_MESSAGE_CLIENT,
  POST_SEND_MESSAGE_SUCCESS_CLIENT,
  POST_SEND_MESSAGE_FAILURE_CLIENT,
} from "../actions/request";
import {
  TRY_POST_FILTERED_REQUESTS,
  POST_FILTERED_REQUESTS_SUCCESS,
  POST_FILTERED_REQUESTS_FAILURE,
  TRY_FETCH_REQUEST,
  FETCH_REQUEST_SUCCESS,
  FETCH_REQUEST_FAILED,
  TRY_POST_SEND_MESSAGE,
  POST_SEND_MESSAGE_SUCCESS,
  POST_SEND_MESSAGE_FAILURE,
  POST_SET_OFFER_SUCCESS,
  POST_SET_OFFER_FAILED,
  TRY_POST_SET_OFFER,
  TRY_GET_PROVIDER,
  GET_PROVIDER_SUCCESS,
  GET_PROVIDER_FAILED,
} from "../actions/provider";

const initialState = {
   updateUserDetailes: {
    inProgress: false,
    try: false,
    error: undefined
  },
  signup: {
    inProgress: false,
    try: false,
    error: undefined
  },
  login: {
    inProgress: false,
    try: false,
    error: undefined
  },
  changePassword: {
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
  fetchRequest: {
    inProgress: false,
    try: false,
    error: undefined
  },
  setOffer: {
    inProgress: false,
    try: false,
    error: undefined
  },
  sendMessage: {
    inProgress: false,
    try: false,
    error: undefined
  },
  sendMessageClient: {
    inProgress: false,
    try: false,
    error: undefined
  },
  getMessages: {
    inProgress: false,
    try: false,
    error: undefined
  },
  checkToken: {
    inProgress: false,
    try: false,
    error: undefined
  },
  updateNotificationSettings: {
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
    reduceFetch("signup", TRY_SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE),
    reduceFetch("login", TRY_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE),
    reduceFetch("changePassword", TRY_CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE),
    reduceFetch("updateUserDetailes", TRY_UPDATE_USER_DETAILES, UPDATE_USER_DETAILES_SUCCESS, UPDATE_USER_DETAILES_FAILURE),
    reduceFetch("updateNotificationSettings", TRY_UPDATE_NOTIFICATIONS_SETTINGS, UPDATE_NOTIFICATIONS_SETTINGS_SUCCESS, UPDATE_NOTIFICATIONS_SETTINGS_FAILURE),
    reduceFetch("getClient", TRY_GET_CLIENT, GET_CLIENT_SUCCESS, GET_CLIENT_FAILURE),
    reduceFetch("getProvider", TRY_GET_PROVIDER, GET_PROVIDER_SUCCESS, GET_PROVIDER_FAILED),
    reduceFetch("createRequest", TRY_CREATE_REQUEST, CREATE_REQUEST_SUCCESS, CREATE_REQUEST_FAILURE),
    reduceFetch("updateRequest", TRY_UPDATE_REQUEST, UPDATE_REQUEST_SUCCESS, UPDATE_REQUEST_FAILURE),
    reduceFetch("postFilteredRequests", TRY_POST_FILTERED_REQUESTS, POST_FILTERED_REQUESTS_SUCCESS, POST_FILTERED_REQUESTS_FAILURE),
    reduceFetch("fetchRequest", TRY_FETCH_REQUEST, FETCH_REQUEST_SUCCESS, FETCH_REQUEST_FAILED),
    reduceFetch("setOffer", TRY_POST_SET_OFFER, POST_SET_OFFER_SUCCESS, POST_SET_OFFER_FAILED),
    reduceFetch("sendMessage", TRY_POST_SEND_MESSAGE, POST_SEND_MESSAGE_SUCCESS, POST_SEND_MESSAGE_FAILURE),
    reduceFetch("sendMessageClient", TRY_POST_SEND_MESSAGE_CLIENT, POST_SEND_MESSAGE_SUCCESS_CLIENT, POST_SEND_MESSAGE_FAILURE_CLIENT),
    reduceFetch("getMessages", TRY_POST_SEND_MESSAGE_CLIENT, POST_SEND_MESSAGE_SUCCESS_CLIENT, POST_SEND_MESSAGE_FAILURE_CLIENT),
    reduceFetch("checkToken", TRY_CHECKTOKEN, CHECKTOKEN_SUCCESS, CHECKTOKEN_FAILURE),
    reduceRowFetch("acceptRequest", TRY_ACCEPT_REQUEST, ACCEPT_REQUEST_SUCCESS, ACCEPT_REQUEST_FAILURE),
    reduceRowFetch("cancelRequest", TRY_CANCEL_REQUEST, CANCEL_REQUEST_SUCCESS, CANCEL_REQUEST_FAILURE),
  ]

  return fetchReducers.reduce((currentState, reducer) =>
    reducer(currentState, action)
  , state)
}

export default userReducer;
