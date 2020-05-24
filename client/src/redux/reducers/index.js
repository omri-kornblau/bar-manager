import { combineReducers } from "redux";

import navbarReducer from "./navbar";
import sidebarReducer from "./sidebar";

export default combineReducers({
  navbar: navbarReducer,
  sidebar: sidebarReducer
});
