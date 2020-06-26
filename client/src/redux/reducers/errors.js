
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
} from "../actions/request";

const initialState = {
  login: {
    inProgress: false,
    try: false,
    error: ""
  },
  getClient: {
    inProgress: false,
    try: false,
    error: ""
  },
  createRequest: {
    inProgress: false,
    try: false,
    error: ""
  },
  updateRequest: {
    inProgress: false,
    try: false,
    error: ""
  }
};

const reduceFetch = (prop, TRY, SUCCESS, FAILURE) => (state, action) => {
  switch(action.type) {
    case TRY:
      return {
        ...state,
        [prop]: {
          inProgress: true,
          try: true,
          error: "",
        }
      }

    case SUCCESS:
      return {
        ...state,
        [prop]: {
          inProgress: false,
          try: true,
          error: "",
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


const userReducer = (state=initialState, action) => {
  const fetchReducers = [
    reduceFetch('login', TRY_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE),
    reduceFetch('getClient', TRY_GET_CLIENT, GET_CLIENT_SUCCESS, GET_CLIENT_FAILURE),
    reduceFetch('createRequest', TRY_CREATE_REQUEST, CREATE_REQUEST_SUCCESS, CREATE_REQUEST_FAILURE),
    reduceFetch('updateRequest', TRY_UPDATE_REQUEST, UPDATE_REQUEST_SUCCESS, UPDATE_REQUEST_FAILURE),
  ]

  return fetchReducers.reduce((currentState, reducer) =>
    reducer(currentState, action)
  , state)
}

export default userReducer;
