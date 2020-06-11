import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Paper,
  Divider,
} from "@material-ui/core";
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

import ProgressBar from "../../../../components/ProgressNavbar/ProgressNavbar";
import dashboardProgresses from "./progressViews";
import { getProgress } from "../../../../redux/selectors/progressBar";
import { getView } from "../../../../redux/selectors/sidebar";


const ClientProgressDashboard = props => {
  const {
    view,
    getProgressWithView,
  } = props;

  const match = useRouteMatch();
  const progresses = dashboardProgresses;

  return (
    <Paper>
      <ProgressBar
        steps={dashboardProgresses}
        step={getProgressWithView(view)}
        baseUrl={match.url}
        view={view}
      /> 
      <Divider/>
      <Container>
        <Switch>
          {progresses.map(progress =>
            <Route key={progress.id} path={`${match.url}/${progress.id}`}>
              {progress.component}
            </Route>
          )}
        </Switch>
      </Container>
    </Paper>
  );
}

const mapStateToProps = state => ({
  getProgressWithView: view => getProgress(state, view),
  view: getView(state),
})

export default connect(mapStateToProps)(ClientProgressDashboard);
