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

const navbarPages = _.filter(pages, { hideFromNavbar: false });
const accountIconPages = _.filter(pages, { hideFromNavbar: true });

const Main = props => {
  const {
    page,
    isLoggedIn
  } = props;

  return (
    <>
      <AppNavbar
        pages={navbarPages}
        accountIconPages={accountIconPages}
        pageKey={page}
        isLoggedIn={isLoggedIn}
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
  isLoggedIn: getUserLoggedIn(state)
})

export default connect(mapStateToProps)(Main);
