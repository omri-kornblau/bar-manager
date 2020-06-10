import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Box
} from "@material-ui/core";
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect
} from "react-router-dom";

import ClientViews from "./homeViews/homeClientViews";
import LoggedOutViews from "../views/loggedOutViews";
import { getView, getClosed } from "../../redux/selectors/sidebar";
import { getUserLoggedIn } from "../../redux/selectors/user";
import { setSidebarClosed } from "../../redux/actions/sidebar";

import useStyles from "./style";

import SecondaryNavbar from "../../components/SecondaryNavbar/SecondaryNavbar";
import { getProgress } from "../../redux/selectors/progressBar";

const ViewsSwitch = ({ views, view, progress, matchUrl }) => (
  <Switch>
    {_.map(views, (viewData, key) =>
      <Route key={key} path={`/home/${key}`}>
        <viewData.component/>
      </Route>
    )}
    <Redirect to={`${matchUrl}/${view}/${progress}`}/>
  </Switch>
);

const Home = props => {
  const {
    view,
    getProgressWithView,
    isLoggedIn
  } = props;

  const match = useRouteMatch();
  const classes = useStyles();

  const views = isLoggedIn ? ClientViews : LoggedOutViews;

  return (
    <>
      <main className={classes.content}>
        { isLoggedIn ?
          <>
            <Box className={classes.cityBackground} height={160}/>
            <SecondaryNavbar
              viewKey={view}
              views={views}
              getProgress={getProgressWithView}
            />
            <Container className={classes.container}>
              <ViewsSwitch
                views={views}
                view={view}
                matchUrl={match.url}
                progress={getProgressWithView(view)}
              />
            </Container>
          </>
          : <ViewsSwitch
            views={views}
            view={view}
            matchUrl={match.url}
            progress={getProgressWithView(view)}
          />
        }
      </main>
    </>
  );
}

const mapStateToProps = state => ({
  view: getView(state),
  getProgressWithView: view => getProgress(state, view),
  sidebarClosed: getClosed(state),
  isLoggedIn: getUserLoggedIn(state)
})

const mapDispatchToProps = dispatch => ({
  setSidebarClosed: setSidebarClosed(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
