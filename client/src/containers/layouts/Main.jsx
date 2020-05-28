import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import pages from "../pages/pages";
import { getPage } from "../../redux/selectors/navbar";

import AppNavbar from "../../components/AppNavbar/AppNavbar";

const Main = props => {
  const {
    page
  } = props;

  return (
    <>
      <AppNavbar
        pages={pages}
        pageKey={page}
      />
      <Switch>
        {_.map(pages, (pageData, key) =>
          <Route key={key} path={`/${key}`}>
            <pageData.component/>
          </Route>
        )}
        <Redirect from="/" to="/home/dashboard"/>
      </Switch>
    </>
  );
}

const mapStateToProps = state => ({
  page: getPage(state)
})

export default connect(mapStateToProps)(Main);
