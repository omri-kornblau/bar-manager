import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import pages from "./mainViews";
import { getPage } from "../redux/selectors/navbar";
import {
  getUserLoggedIn,
  isProvider,
} from "../redux/selectors/user";
import {
  checkToken as checkTokenThunk,
  logout as logoutThunk
} from "../redux/thunks/login";

import {
  getClientData,
} from "../redux/thunks/client"

import {
  getProviderData,
} from "../redux/thunks/provider"

import AppNavbar from "../components/AppNavbar/AppNavbar";
import { getLocation } from "connected-react-router";

const navbarPages = _.filter(pages, { hideFromNavbar: false });
const accountIconPages = _.filter(pages, { hideFromNavbar: true });

const Main = props => {
  const {
    page,
    isLoggedIn,
    checkToken,
    logout,
    getClient,
    getProvider,
    isProvider,
    location,
  } = props;

  const { pathname, search, hash } = location;

  useEffect(() => {
    checkToken(`${pathname}${search}${hash}`);
    isProvider ? getProvider() : getClient();
  }, [isProvider]);

  return (
    <>
      <AppNavbar
        pages={navbarPages}
        accountIconPages={accountIconPages}
        pageKey={page}
        isLoggedIn={isLoggedIn}
        logout={logout}
      />
      <Switch>
        {_.map(pages, pageData =>
          <Route key={pageData.id} path={`/${pageData.id}`}>
            <pageData.component/>
          </Route>
        )}
        <Redirect from="/" to="/home"/>
      </Switch>
    </>
  );
}

const mapStateToProps = state => ({
  page: getPage(state),
  isLoggedIn: getUserLoggedIn(state),
  location: getLocation(state),
  isProvider: isProvider(state),
})

const mapDispatchToProps = dispatch => ({
  checkToken: checkTokenThunk(dispatch),
  logout: logoutThunk(dispatch),
  getClient: getClientData(dispatch),
  getProvider: getProviderData(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
