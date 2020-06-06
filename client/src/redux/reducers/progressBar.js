import {
  LOCATION_CHANGE
} from "connected-react-router"

const initialProgressBar = {};

const progressBarReducer = (state=initialProgressBar, action) => {
  switch(action.type) {
    case LOCATION_CHANGE:
      const { pathname } = action.payload.location;
      if (pathname.match("^/home/.*?/.+")) {
        const type = pathname.split("/")[2]
        const progress = pathname.split("/")[3]

        return {
          ...state,
          [type]: progress,
        }
      }
      return state;

    default:
      return state;
  }
}

export default progressBarReducer;
