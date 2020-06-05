import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Toolbar,
  Box
} from "@material-ui/core";
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect
} from "react-router-dom";

import ClientViews from "../views/clientViews";
import { getView, getClosed } from "../../redux/selectors/sidebar";
import { setSidebarClosed } from "../../redux/actions/sidebar";

import useStyles from "./style";

import SecondaryNavbar from "../../components/SecondaryNavbar/SecondaryNavbar";

const Home = props => {
  const {
    view
  } = props;

  const match = useRouteMatch();
  const classes = useStyles();
  const views = ClientViews;

  return (
    <>
      <main className={classes.content}>
        <Box className={classes.cityBackground} height={160}/>
        <SecondaryNavbar
          viewKey={view}
          views={views}
        />
        <Container className={classes.container}>
          <Switch>
            {_.map(views, (viewData, key) =>
              <Route key={key} path={`${match.url}/${key}`}>
                <viewData.component/>
              </Route>
            )}
            <Redirect to={`${match.url}/${view}`}/>
          </Switch>
        </Container>
      </main>
    </>
  );
}

const mapStateToProps = state => ({
  view: getView(state),
  sidebarClosed: getClosed(state)
})

const mapDispatchToProps = dispatch => ({
  setSidebarClosed: setSidebarClosed(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
