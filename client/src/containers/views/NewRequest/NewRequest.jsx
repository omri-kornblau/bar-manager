import React from "react";
import { connect } from "react-redux";
import {
  Paper,
  Container,
  Typography,
  Box
} from "@material-ui/core";

import steps from "./steps";
import { getStep } from "../../../redux/selectors/newRequest";
import { setStep } from "../../../redux/actions/newRequest";

import Stepper from "../../../components/Stepper/Stepper";

const NewRequest = props => {
  const {
    step,
    setStep
  } = props;

  const stepData = steps[step];

  const _onNext= () => {
    setStep(Math.min(steps.length - 1, step + 1));
  }

  const _onBack= () => {
    setStep(Math.max(0, step - 1));
  }

  const StepBody = () => (stepData ?
    <stepData.component
      onBack={_onBack}
      onNext={_onNext}
    />
    : <div/>
  )

  return (
    <>
    <Container maxWidth="md">
      <Stepper
        activeStep={step}
        setActiveStep={setStep}
        steps={steps.map(step => step.label)}
      />
    </Container>
    <Box mb={3}/>
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <Box justifyContent="center" pr={5} pl={5} p={3}>
          <Typography align="left" variant="h5">
            {stepData.header}
          </Typography>
          <StepBody/>
        </Box>
      </Paper>
    </Container>
    </>
  );
}

const mapStateToProps = state => ({
  step: getStep(state)
})

const mapDispatchToProps = dispatch => ({
  setStep: setStep(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NewRequest);
