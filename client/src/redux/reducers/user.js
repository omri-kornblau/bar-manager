import {
  SET_LOGGED_IN
} from "../actions/user";

const initialUser = {
  data: {
    name: "",
    type: ""
  },
  isLoggedIn: true
};

const userReducer = (state=initialUser, action) => {
  switch(action.type) {
    case SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload.loggedIn
      }

    default:
      return state;
  }
}

export default userReducer;
