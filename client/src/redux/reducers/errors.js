
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  TRY_LOGIN
} from "../actions/login";

const initialUser = {
  login: {
    try: false,
    error: ""
  }
};

const userReducer = (state=initialUser, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          inProgress: false,
          try: false,
          error: ""
        }
      }

    case LOGIN_FAILURE:
      return {
        ...state,
        login: {
          ...state.login,
          inProgress: false,
          error: action.payload.err
        }
      }

    case TRY_LOGIN:
      return {
        ...state,
        login: {
          ...state.login,
          inProgress: true,
          try: true
        }
      }

    default:
      return state;
  }
}

export default userReducer;
