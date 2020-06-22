import {
  SET_SIDEBAR_CLOSED
} from "../actions/sidebar";
import {
  LOCATION_CHANGE
} from "connected-react-router"

const initialSidebar = {
  view: "welcome",
  closed: false
};

const navbarReducer = (state=initialSidebar, action) => {
  switch(action.type) {
    case SET_SIDEBAR_CLOSED:
      return {
        ...state,
        closed: action.payload.closed
      }

    case LOCATION_CHANGE:
      const { pathname } = action.payload.location;
      if (pathname.match("^/home/.*")) {
        return {
          ...state,
          view: pathname.split("/")[2]
        }
      }
      return state;

    default:
      return state;
  }
}

export default navbarReducer;
