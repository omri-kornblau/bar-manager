import React from "react";
import { connect } from "react-redux";
import {
  Button,
} from '@material-ui/core';

const ConnectedButton = props => {
  const {
    label,
    action,
    dispatch,
    actionParams,
  } = props;

  return (
    <Button variant="contained" color="primary" size="small" onClick={() => {
      action(dispatch, actionParams)
    }}>
      {label}
    </Button>
  )
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedButton);
