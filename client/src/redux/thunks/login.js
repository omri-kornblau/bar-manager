import _ from "lodash";
import { push } from "connected-react-router";

import {
  tryLogin,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  tryCheckToken,
  checkTokenSuccess,
  checkTokenFailure
} from "../actions/login";
import {
  postLogin,
  getCheckToken,
  getLogout,
} from "../../api/authentication";

import { getClientData } from "./client";
import { getProviderData } from "./provider";
import { getView } from "../selectors/sidebar";
import LoggedOutViews from "../../containers/mainViews/homeViews/loggedOutViews";

export const login = outerDispatch => (username, password) =>
  outerDispatch(dispatch => {
    dispatch(tryLogin())

    postLogin(username, password)
      .then(res => {
        dispatch(loginSuccess(res.data));
        dispatch(push("/home/dashboard/edit"));
        getClientData(dispatch)();
      })
      .catch(err => {
        dispatch(loginFailure(err))
      });
  })

export const checkToken = outerDispatch => originUrl =>
  outerDispatch((dispatch, getState) => {
    dispatch(tryCheckToken())

    getCheckToken()
      .then(res => {
        const state = getState();
        const isProvider = res.data.type === "provider";

        dispatch(checkTokenSuccess(res.data));
        if (_.isNaN(LoggedOutViews[getView(state)])) {
          dispatch(push(originUrl));
        }
        isProvider ?
          getProviderData(outerDispatch)({ isForce: true }) :
          getClientData(outerDispatch)({ isForce: true });
      })
      .catch(err => {
        dispatch(checkTokenFailure(err));
        dispatch(push("/home/welcome"));
      })
  })

export const logout = outerDispatch => () =>
  outerDispatch(dispatch => {
    getLogout()
      .then(res => {
        dispatch(logoutSuccess());
        dispatch(push("/home/welcome"));
      });
  })
