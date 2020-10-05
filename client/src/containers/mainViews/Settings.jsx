import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Box,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress
} from "@material-ui/core";
import {
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { useRouteMatch } from "react-router";

import views from "./settingsViews";
import { getSettingsTab } from "../../redux/selectors/settingsTab";

import useStyles from "./style";
import EscapeModal from "../../components/ModalEscape/ModalEscape";
import { getUserType } from "../../redux/selectors/user";
import {
  getClientErrors,
  getProviderErrors,
} from "../../redux/selectors/errors";

const Settings = props => {
  const {
    settingsTab,
    loadingStatus,
  } = props;

  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Box className={classes.cityBackground} height={160}/>
      <div className={classes.pageHeaderContainer}>
        <Paper className={classes.pageHeader} >
          <Typography align="center" variant="h5">
            הגדרות
          </Typography>
        </Paper>
      </div>
      <Box mt={5}/>
      {
        !_.isNil(loadingStatus) && loadingStatus.try && !loadingStatus.inProgress
        ? <Grid container direction="row">
            <Grid item container direction="column" alignItems="flex-end" xs>
              <Container maxWidth="xs" className={classes.container}/>
              <Typography align="left" variant="h6">
                הגדרות חשבון
              </Typography>
              <List dense>
                <Divider/>
                {views.map(view => (
                  <Link to={`/settings/${view.id}`}>
                    <ListItem selected={view.id === settingsTab} button key={view.id}>
                      <ListItemIcon>{view.icon}</ListItemIcon>
                      <ListItemText primary={view.label} />
                    </ListItem>
                    <Divider/>
                  </Link>
                ))}
              </List>
            </Grid>
            <Grid item container justify="center" xs={6}>
              <Container maxWidth="sm" className={classes.container}>
                <Paper>
                  <Box p={3}>
                    <Switch>
                      {views.map(view =>
                        <Route key={view.id} path={`/settings/${view.id}`}>
                          <view.component viewLabel={view.label}/>
                        </Route>
                      )}
                      <Redirect to={`/settings/${settingsTab}`}/>
                    </Switch>
                  </Box>
                </Paper>
              </Container>
            </Grid>
            <Grid item xs/>
          </Grid>
        : <EscapeModal open={true}>
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
      }
    </main>
  );
}

const mapStateToProps = state => ({
  settingsTab: getSettingsTab(state),
  loadingStatus: getUserType(state) === "client"
    ? getClientErrors(state)
    : getProviderErrors(state),
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
