import _ from "lodash";
import {
  interval,
} from "../../helpers/interval";
import {
  getIntervals,
  getIntervalId,
} from "../selectors/interval";
import {
  setIntervals as setIntervalsAction,
} from "../actions/interval";
import { REFRESH_INTERVAL } from "../../constants/intervals";

export const addInterval = outerDispatch => (intervalName, params) => {
  outerDispatch((dispatch, getState) => {
    const state = getState();
    const intervals = [
        ...getIntervals(state),
        {
          name: intervalName,
          params: params
        }
      ];
    const currentIntervalId = getIntervalId(state);

    if (!_.isNil(currentIntervalId)) {
      clearInterval(currentIntervalId);
    }

    const intervalId = setInterval(
      () => interval(intervals, dispatch)
    ,REFRESH_INTERVAL);

    dispatch(setIntervalsAction(intervals, intervalId));
  })
}

export const removeInterval = outerDispatch => intervalName => {
  outerDispatch((dispatch, getState) => {
    const state = getState();
    const currentIntervals = getIntervals(state);
    const currentIntervalId = getIntervalId(state);

    if (!_.isNil(currentIntervalId)) {
      clearInterval(currentIntervalId);
    }

    const intervals = _.reject(currentIntervals, { name: intervalName });
    const intervalId = intervals.length > 0
      ? setInterval(
          () => interval(intervals, dispatch),
          REFRESH_INTERVAL)
      : undefined;

    dispatch(setIntervalsAction(intervals, intervalId));
  })
}
