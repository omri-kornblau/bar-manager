import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Toolbar
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

import Sidebar from "../../components/Sidebar/Sidebar";

const Home = props => {
  const {
    view,
    sidebarClosed,
    setSidebarClosed
  } = props;

  const match = useRouteMatch();
  const classes = useStyles();
  const views = ClientViews;

  return (
    <>
      <Sidebar
        closed={sidebarClosed}
        onCloseClick={() => setSidebarClosed(!sidebarClosed)}
        viewKey={view}
        views={views}
      />
      <main className={classes.content}>
        <Toolbar/>
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
