import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from "../actions/login";

const initialUser = {
  data: {
    name: "",
    type: ""
  },
  isLoggedIn: true
};

const userReducer = (state=initialUser, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: {
          name: action.payload.name,
          type: action.payload.type
        },
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
