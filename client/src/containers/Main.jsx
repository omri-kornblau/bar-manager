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

import AppNavbar from "../components/AppNavbar/AppNavbar";
import { getLocation } from "connected-react-router";
import { getIntervals } from "../redux/selectors/interval";
import { addInterval, removeInterval } from "../redux/thunks/interval";
import { GET_CLIENT, GET_PROVIDER } from "../constants/intervals";
import { getLoading } from "../redux/selectors/request";
import { getCheckTokenErrors } from "../redux/selectors/errors";
import { Box, CircularProgress, Grid } from "@material-ui/core";
import EscapeModal from "../components/ModalEscape/ModalEscape";

const navbarPages = _.filter(pages, { hideFromNavbar: false });
const accountIconPages = _.filter(pages, { hideFromNavbar: true });

const Main = props => {
  const {
    page,
    isLoggedIn,
    checkToken,
    logout,
    isProvider,
    location,
    addInterval,
    removeInterval,
    checkTokenStatus,
  } = props;

  const { pathname, search, hash } = location;

  useEffect(() => {
    checkToken(`${pathname}${search}${hash}`);
  }, []);

  useEffect(() => {
    if (isLoggedIn && checkTokenStatus.try && !checkTokenStatus.inProgress) {
      addInterval(isProvider)
      return () => removeInterval(isProvider);
    }
  }, [isLoggedIn, checkTokenStatus, isProvider])

  return (
    <>
      <AppNavbar
        pages={navbarPages}
        accountIconPages={accountIconPages}
        pageKey={page}
        isLoggedIn={isLoggedIn}
        logout={logout}
      />
      {
<<<<<<< HEAD
        checkTokenStatus.inProgress
        ? <Modal open={true}>
=======
        isLoading
        ? <EscapeModal open={true}>
>>>>>>> 6675160... Exit modals on escape
            <Grid container alignItems="center" direction="row" style={{height: "100%"}}>
              <Grid container item direction="column" alignItems="center">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CircularProgress color="primary" size={80}/>
                </Box>
              </Grid>
            </Grid>
          </EscapeModal>
        : <Switch>
            {_.map(pages, pageData =>
              <Route key={pageData.id} path={`/${pageData.id}`}>
                <pageData.component/>
              </Route>
            )}
            <Redirect from="/" to="/home"/>
          </Switch>
      }
    </>
  );
}

const mapStateToProps = state => ({
  page: getPage(state),
  isLoggedIn: getUserLoggedIn(state),
  location: getLocation(state),
  isProvider: isProvider(state),
  intervals: getIntervals(state),
  checkTokenStatus: getCheckTokenErrors(state),
})

const mapDispatchToProps = dispatch => ({
  checkToken: checkTokenThunk(dispatch),
  logout: logoutThunk(dispatch),
  addInterval: isProvider =>
    addInterval(dispatch)(isProvider ? GET_PROVIDER : GET_CLIENT, [{ isLoading: false }]),
  removeInterval: isProvider =>
    removeInterval(dispatch)(isProvider ? GET_PROVIDER : GET_CLIENT),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
