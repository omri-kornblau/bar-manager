import React from "react";
import { connect } from "react-redux";
import useStyles from "./style";
import LoadingButton from "../LoadingButton/LoadingButton";
import {
  getErrors,
} from "../../redux/selectors/errors";

const ConnectedButton = props => {
  const {
    label,
    action,
    dispatch,
    actionParams,
    className,
    color,
    errors,
    progressName,
  } = props;

  const classes = useStyles();

  return (
    <LoadingButton
      variant="contained"
      size="small"
      className={classes[className]}
      onClick={() => {
        action(dispatch, actionParams)
      }}
      color={color}
      loading={!!progressName ? !!errors[progressName][actionParams._id] ? errors[progressName][actionParams._id].inProgress : false : false}
    >
      {label}
    </LoadingButton>
  )
}

const mapStateToProps = state => ({
  errors: getErrors(state)
});
const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedButton);
