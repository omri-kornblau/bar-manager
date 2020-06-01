import {
  SET_SIDEBAR_CLOSED
} from "../actions/sidebar";

const initialUser = {
  data: {
    name: "",
    type: ""
  },
  isLoggedIn: false
};

const userReducer = (state=initialUser, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

export default userReducer;
