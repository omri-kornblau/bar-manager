import { SET_STEP } from "../actions/newRequest";
import { LOCATION_CHANGE } from "connected-react-router";

const initialState = {
  step: 1,
  view: "typeA"
};

const newRequestReducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_STEP:
      return {
        ...state,
        step: action.payload.step
      }

    case LOCATION_CHANGE:
      const { pathname } = action.payload.location;
      if (pathname.match("^/home/newrequest/.*")) {
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

export default newRequestReducer;
