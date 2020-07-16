import _ from "lodash";
import {
  intervals as intervalsFuncs,
} from "../constants/intervals";
export const interval = (intervals, dispatch) => {
  intervals.forEach(interval => {
    const func = intervalsFuncs[interval.name](dispatch);
    _.isNil(interval.params)
      ? func()
      : func(...interval.params)
  });
}
