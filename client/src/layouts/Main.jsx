import _ from "lodash";
import React from "react";
import { connect } from 'react-redux'

import Pages from "../pages/pages";

import AppNavbar from "../components/AppNavbar/AppNavbar";

import { setPage } from "../actions/navbar";
import { getPage } from "../selectors/navbar";

const Main = props => {
  const {
    page
  } = props;

  if (!Pages[page]) {
    console.warn(`[Warning] No such page as ${page}`);
  }

  const pageData = Pages[page] || Pages[_.first(_.keys(Pages))];
  const Page = pageData.component;

  return (
    <>
      <AppNavbar
        Pages={Pages}
        setPage={setPage}
        pageKey={page}
      />
      <Page/>
    </>
  )
}

const mapStateToProps = state => ({
  page: getPage(state)
})

export default connect(mapStateToProps)(Main);
