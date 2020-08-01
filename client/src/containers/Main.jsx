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
import { getIntervals } from "../redux/selectors/interval";
import { addInterval, removeInterval } from "../redux/thunks/interval";
import { GET_CLIENT, GET_PROVIDER } from "../constants/intervals";
import { getLoading } from "../redux/selectors/request";
import { Box, CircularProgress, Grid, Modal } from "@material-ui/core";

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
    addInterval,
    removeInterval,
    isLoading,
  } = props;

  const { pathname, search, hash } = location;

  useEffect(() => {
    checkToken(`${pathname}${search}${hash}`);
    isProvider ? getProvider({isForce: true}) : getClient({isForce: true});
    addInterval(isProvider)
    return () => removeInterval(isProvider);
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
      {
        isLoading
        ? <Modal open={true}>
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
          </Modal>
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
  isLoading: getLoading(state),
})

const mapDispatchToProps = dispatch => ({
  checkToken: checkTokenThunk(dispatch),
  logout: logoutThunk(dispatch),
  getClient: getClientData(dispatch),
  getProvider: getProviderData(dispatch),
  addInterval: isProvider =>
    addInterval(dispatch)(isProvider ? GET_PROVIDER : GET_CLIENT, [{isLoading: false}]),
  removeInterval: isProvider =>
    removeInterval(dispatch)(isProvider ? GET_PROVIDER : GET_CLIENT),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
