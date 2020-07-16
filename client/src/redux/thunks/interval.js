import _ from "lodash";
import {Mutex} from 'async-mutex';
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

const mutex = new Mutex();

export const addInterval = outerDispatch => (intervalName, params) => {
  outerDispatch((dispatch, getState) => {
    mutex.acquire().then(release => {
      const state = getState();
      const intervals = [
          ...getIntervals(state),
          {
            name: intervalName,
            params: params
          }
        ];
      let intervalId = getIntervalId(state);

      if (!_.isNil(intervalId)) {
        clearInterval(intervalId);
      }

      intervalId = setInterval(
        () => interval(intervals, dispatch),
        REFRESH_INTERVAL);

      dispatch(setIntervalsAction(intervals, intervalId, release));
    });
  })
}

export const removeInterval = outerDispatch => intervalName => {
  outerDispatch((dispatch, getState) => {
    mutex.acquire().then(release => {
      const state = getState();
      let intervals = getIntervals(state);
      let intervalId = getIntervalId(state);

      if (!_.isNil(intervalId)) {
        clearInterval(intervalId);
      }

      intervals = _.remove(state.intervals, {name: intervalName});
      intervalId = intervals.length > 0
        ? setInterval(
            () => interval(intervals, dispatch),
            REFRESH_INTERVAL)
        : undefined;

      dispatch(setIntervalsAction(intervals, intervalId, release));
    });
  })
}
