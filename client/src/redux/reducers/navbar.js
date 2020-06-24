import { SET_NAVBAR } from "../actions/navbar";
import { LOCATION_CHANGE } from "connected-react-router";

const initialNavbar = "home";

const navbarReducer = (state=initialNavbar, action) => {
  switch(action.type) {
    case SET_NAVBAR:
      return action.payload.page;

    case LOCATION_CHANGE:
      const { pathname } = action.payload.location;
      if (pathname.match("^/.*")) {
        return pathname.split("/")[1];
      }
      return state;

    default:
      return state;
  }
}

export default navbarReducer;
