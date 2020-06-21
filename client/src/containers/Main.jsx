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
import { getUserLoggedIn } from "../redux/selectors/user";
import {
  checkToken as checkTokenThunk,
  logout as logoutThunk
} from "../redux/thunks/login";

import {
  getClientData,
} from "../redux/thunks/client"

import AppNavbar from "../components/AppNavbar/AppNavbar";

const navbarPages = _.filter(pages, { hideFromNavbar: false });
const accountIconPages = _.filter(pages, { hideFromNavbar: true });

const Main = props => {
  const {
    page,
    isLoggedIn,
    checkToken,
    logout,
    getClient,
  } = props;

  useEffect(() => {
    checkToken();
    getClient();
  }, []);

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
})

const mapDispatchToProps = dispatch => ({
  checkToken: checkTokenThunk(dispatch),
  logout: logoutThunk(dispatch),
  getClient: getClientData(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
