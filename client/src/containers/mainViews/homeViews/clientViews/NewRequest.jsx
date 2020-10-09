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
import { getUserData } from "../../../../redux/selectors/user";

import newRequestViews from "./newRequestViews";

const NewRequest = props => {
  const {
    view,
    clientData
  } = props;

  const match = useRouteMatch();

  return (
    <>
      <Switch>
        {newRequestViews.map(newRequestView =>
          <Route key={newRequestView.id} path={`${match.url}/${newRequestView.id}`}>
            <newRequestView.component
              clientData={clientData}
              viewLabel={newRequestView.label}
              view={newRequestView.id}
            />
          </Route>
        )}
        <Redirect to={`${match.url}/${view}`}/>
      </Switch>
    </>
  );
}

const mapStateToProps = state => ({
  view: getNewRequestView(state),
  clientData: getUserData(state)
})

export default connect(mapStateToProps)(NewRequest);
