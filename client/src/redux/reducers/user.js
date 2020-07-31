import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from "../actions/login";

const initialUser = {
  data: {
    name: "",
    type: "",
    email: "",
  },
  isLoggedIn: true
};

const userReducer = (state=initialUser, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoggedIn: true
      }

    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false
      }

    default:
      return state;
  }
}

export default userReducer;
