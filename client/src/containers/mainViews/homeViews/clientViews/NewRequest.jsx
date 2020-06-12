import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  Grid
} from "@material-ui/core";
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect
} from "react-router-dom";

import { getNewRequestView } from "../../../../redux/selectors/newRequest";

import newRequestViews from "./newRequestViews";
import DraftsTable from "../../../../components/NewRequestForm/Drafts";

const NewRequest = props => {
  const {
    view,
  } = props;

  const match = useRouteMatch();

  return (
    <>
      <Grid container direction="row">
        <Grid item xs/>
        <Grid item justify="center" xs="6">
          <Switch>
            {newRequestViews.map(newRequestView =>
              <Route key={newRequestView.id} path={`${match.url}/${newRequestView.id}`}>
                <newRequestView.component viewLabel={newRequestView.label}/>
              </Route>
            )}
            <Redirect to={`${match.url}/${view}`}/>
          </Switch>
        </Grid>
        <Grid item container alignItems="center" justify="center" xs>
          <DraftsTable/>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = state => ({
  view: getNewRequestView(state),
})

export default connect(mapStateToProps)(NewRequest);
