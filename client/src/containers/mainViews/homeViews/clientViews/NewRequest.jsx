import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect
} from "react-router-dom";

import { getNewRequestView } from "../../../../redux/selectors/newRequest";

import newRequestViews from "./newRequestViews";

const NewRequest = props => {
  const {
    view,
  } = props;

  const match = useRouteMatch();

  return (
    <Switch>
      {newRequestViews.map(newRequestView =>
        <Route key={newRequestView.id} path={`${match.url}/${newRequestView.id}`}>
          <newRequestView.component/>
        </Route>
      )}
      <Redirect to={`${match.url}/${view}`}/>
    </Switch>
  );
}

const mapStateToProps = state => ({
  view: getNewRequestView(state),
})

export default connect(mapStateToProps)(NewRequest);
