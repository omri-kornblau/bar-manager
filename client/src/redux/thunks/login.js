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
import LoggedOutViews from "../../views/mainViews/homeViews/loggedOutViews";

const getDataByResult = dispatch => res => {
  const isProvider = res.data.type === "provider";

  isProvider ?
    getProviderData(dispatch)({ isForce: true }) :
    getClientData(dispatch)({ isForce: true });
}

export const login = outerDispatch => (username, password) =>
  outerDispatch(dispatch => {
    dispatch(tryLogin())

    postLogin(username, password)
      .then(res => {
        dispatch(loginSuccess(res.data));
        dispatch(push("/home/dashboard/edit"));

        getDataByResult(outerDispatch)(res);
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

        dispatch(checkTokenSuccess(res.data));
        if (_.isNaN(LoggedOutViews[getView(state)])) {
          dispatch(push(originUrl));
        }

        getDataByResult(outerDispatch)(res);
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
