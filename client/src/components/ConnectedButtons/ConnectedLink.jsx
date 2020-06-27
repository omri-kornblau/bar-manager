import React from "react";
import { connect } from "react-redux";
import {
  Link,
} from '@material-ui/core';
import useStyles from "./style";

const ConnectedLink = props => {
  const {
    label,
    action,
    dispatch,
    actionParams,
  } = props;

  const classes = useStyles();

  return (
    <Link
      onClick={() => {
        action(dispatch, actionParams)
      }}
      href="#"
    >
      {label}
    </Link>
  )
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedLink);
