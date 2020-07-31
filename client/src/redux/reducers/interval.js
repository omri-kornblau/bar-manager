import _ from "lodash";
import {
  SET_INTERVALS,
} from "../actions/interval";

const initialState = {
  intervals: [],
  intervalId: undefined,
};

const intervalReducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_INTERVALS:
      return {
        intervals: action.payload.intervals,
        intervalId: action.payload.intervalId,
      };

    default:
      return state;
  }
}

export default intervalReducer;
