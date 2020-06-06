import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  Container,
} from "@material-ui/core";
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

import ProgressBar from "../../components/ProgressNavbar/ProgressNavbar";
import dashboardProgresses from "./dashboardProgresses";
import { getProgress } from "../../redux/selectors/progressBar";
import { getView } from "../../redux/selectors/sidebar";


const ClientDashboard = props => {
  const {
    view,
    getProgressWithView,
  } = props;

  const match = useRouteMatch();
  const progresses = dashboardProgresses;

  return (
    <>
      <ProgressBar
        steps={dashboardProgresses}
        step={getProgressWithView(view)}
        baseUrl={match.url}
      /> 
      <Container>
        <Switch>
          {progresses.map(progress =>
            <Route key={progress.id} path={`${match.url}/${progress.id}`}>
              {progress.component}
            </Route>
          )}
        </Switch>
      </Container>
    </>
  );
}

const mapStateToProps = state => ({
  getProgressWithView: view => getProgress(state, view),
  view: getView(state),
})

export default connect(mapStateToProps)(ClientDashboard);
