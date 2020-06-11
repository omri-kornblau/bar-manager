import _ from "lodash";
import { Link } from "react-router-dom";
import React, { useState, useEffect, cloneElement } from "react";
import PropTypes from "prop-types";
import {
  Fab,
  Step,
  Stepper,
  StepLabel,
  StepConnector,
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

import useStyles from "./style";
import { common } from "@material-ui/core/colors";

// const defaultProps = {
//   pages: {
//     default: {
//       name: "default",
//       component: AppBar
//     }
//   },
//   pageKey: "default",
// };

// const propTypes = {
//   pages: PropTypes.object,
//   pageKey: PropTypes.string,
// };

const StepIcon = props => {
  const {
    active,
    color,
    icon,
    id,
  } = props;

  const defaultColor = common.white;

  return (
    <Link to={`${id}`}>
      <Fab style={{backgroundColor: active ? color : defaultColor }}>
        {cloneElement(icon, {style:{color: active ? defaultColor : color}})}
      </Fab>
    </Link>
  );
}

const PositionedStepConnector = props => {
  const classes = useStyles();

  return props.index > 1 ? <StepConnector className={classes.stepConnector}/> : ""
}

const ProgressNavbar = props => {
  const {
    step,
    steps,
    view,
  } = props;


  const [stepIndex, setStepIndex] = useState(-1);

  useEffect(() => {
    const stepIndex = steps.reduce((result, currentStep, index) => {
      return currentStep.id === step ? index + 1 : result
    }, -1);

    setStepIndex(stepIndex);
  });

  const classes = useStyles();

  return (
    <>
      <Stepper
        alternativeLabel
        activeStep={stepIndex}
        connector={ <PositionedStepConnector/> }
        className={classes.paper}
      >
        <Link to={`/home/newrequest/${view}`}>
          <Fab color="primary" aria-label="add">
            <AddIcon variant="outlined" />
          </Fab>
        </Link>
        {
          steps.map(step => (
            <Step key={step.id}>
              <StepLabel
                StepIconComponent={StepIcon}
                StepIconProps={{
                  color: step.color,
                  icon: step.icon,
                  id: step.id,
                }}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))
        }
      </Stepper>
    </>
  );
}

// AppNavbar.propTypes = propTypes;
// AppNavbar.defaultProps = defaultProps;

export default ProgressNavbar;
