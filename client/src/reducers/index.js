import { combineReducers } from "redux";

import navbarReducer from "./navbar";

export default combineReducers({
  navbar: navbarReducer
});
