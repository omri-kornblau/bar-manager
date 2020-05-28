import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  paper: {
    backgroundColor: "transparent"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const HorizontalLinearStepper = props => {
  const {
    activeStep,
    steps
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper className={classes.paper} activeStep={activeStep}>
        {steps.map(label =>
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        )}
      </Stepper>
    </div>
  );
}

export default HorizontalLinearStepper;
