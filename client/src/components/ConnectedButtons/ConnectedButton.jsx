import React from "react";
import { connect } from "react-redux";
import {
  Button,
} from '@material-ui/core';
import useStyles from "./style";

const ConnectedButton = props => {
  const {
    label,
    action,
    dispatch,
    actionParams,
    className,
    color,
  } = props;

  const classes = useStyles();

  return (
    <Button
      variant="contained"
      size="small"
      className={classes[className]}
      onClick={() => {
        action(dispatch, actionParams)
      }}
      color={color}
    >
      {label}
    </Button>
  )
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedButton);
