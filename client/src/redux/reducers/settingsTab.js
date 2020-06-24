import { SET_SETTINGS_TAB } from "../actions/settingsTab";
import { LOCATION_CHANGE } from "connected-react-router";

const initialState = "notifications";

const settingsTabReducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_SETTINGS_TAB:
      return action.payload.page;

    case LOCATION_CHANGE:
      const { pathname } = action.payload.location;
      if (pathname.match("^/settings/.*")) {
        return pathname.split("/")[2];
      }
      return state;

    default:
      return state;
  }
}

export default settingsTabReducer;
