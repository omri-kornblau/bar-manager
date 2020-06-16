import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions/login";

const initialUser = {
  data: {
    name: "",
    type: ""
  },
  isLoggedIn: false
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
      return {
        ...state,
        isLoggedIn: false
      }

    default:
      return state;
  }
}

export default userReducer;
