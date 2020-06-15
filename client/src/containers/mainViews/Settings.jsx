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
  Divider
} from "@material-ui/core";
import {
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { useRouteMatch } from "react-router";

import useStyles from "./style";

import views from "./settingsViews";

const Settings = props => {
  const {
  } = props;

  const match = useRouteMatch();

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
      <Grid container direction="row">
        <Grid item container direction="column" alignItems="center" xs>
          <Container maxWidth="xs" className={classes.container}/>
          <Typography align="left" variant="h6">
            הגדרות חשבון
          </Typography>
          <List dense>
            <Divider/>
            {views.map(view => (
              <Link to={`/settings/${view.id}`}>
                <ListItem button key={view.id}>
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
                    <Route key={view.id} path={`${match.url}/${view.id}`}>
                      <view.component viewLabel={view.label}/>
                    </Route>
                  )}
                  <Redirect to={`${match.url}/${views[0].id}`}/>
                </Switch>
              </Box>
            </Paper>
          </Container>
        </Grid>
        <Grid item xs/>
      </Grid>
    </main>
  );
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
