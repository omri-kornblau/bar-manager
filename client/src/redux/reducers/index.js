import { combineReducers } from "redux";

import navbarReducer from "./navbar";
import sidebarReducer from "./sidebar";
import newRequestReducer from "./newRequest";
import progressBarReducer from "./progressBar"

export default combineReducers({
  navbar: navbarReducer,
  sidebar: sidebarReducer,
  newRequest: newRequestReducer,
  progressBar: progressBarReducer,
});
