import { combineReducers } from "redux";

import navbarReducer from "./navbar";
import sidebarReducer from "./sidebar";
import newRequestReducer from "./newRequest";
import progressBarReducer from "./progressBar"
import settingsTabReducer from "./settingsTab"
import userReducer from "./user";
import errorsReducer from "./errors";
import notificationReducer from "./notification";
import clientReducer from "./client";
import providerReducer from "./provider";

export default combineReducers({
  navbar: navbarReducer,
  sidebar: sidebarReducer,
  newRequest: newRequestReducer,
  progressBar: progressBarReducer,
  settingsTab: settingsTabReducer,
  user: userReducer,
  errors: errorsReducer,
  client: clientReducer,
  notifications: notificationReducer,
  provider: providerReducer,
});
