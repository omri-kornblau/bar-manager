import { SET_NAVBAR } from "../actions/navbar";

const initialNavbar = "home";

const navbarReducer = (state=initialNavbar, action) => {
  switch(action.type) {
    case SET_NAVBAR:
      return action.payload.page;

    default:
      return state;
  }
}

export default navbarReducer;
