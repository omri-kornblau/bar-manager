import { combineReducers } from "redux";

import navbarReducer from "./navbar";
import sidebarReducer from "./sidebar";
import newRequestReducer from "./newRequest";
import progressBarReducer from "./progressBar"
import settingsTabReducer from "./settingsTab"
import userReducer from "./user";
import errorsReducer from "./errors";
import requestReducer from "./request";

export default combineReducers({
  navbar: navbarReducer,
  sidebar: sidebarReducer,
  newRequest: newRequestReducer,
  progressBar: progressBarReducer,
  settingsTab: settingsTabReducer,
  user: userReducer,
  errors: errorsReducer,
  request: requestReducer,
});
