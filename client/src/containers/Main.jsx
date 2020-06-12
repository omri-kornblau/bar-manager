import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import pages from "./mainViews";
import { getPage } from "../redux/selectors/navbar";
import { getUserLoggedIn } from "../redux/selectors/user";

import AppNavbar from "../components/AppNavbar/AppNavbar";

const Main = props => {
  const {
    page,
    isLoggedIn
  } = props;

  return (
    <>
      <AppNavbar
        pages={pages}
        pageKey={page}
        isLoggedIn={isLoggedIn}
      />
      <Switch>
        {_.map(pages, (pageData, key) =>
          <Route key={key} path={`/${key}`}>
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
  isLoggedIn: getUserLoggedIn(state)
})

export default connect(mapStateToProps)(Main);
