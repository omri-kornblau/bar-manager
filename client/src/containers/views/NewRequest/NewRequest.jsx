import React from "react";
import { connect } from "react-redux";
import {
  Paper,
  Container,
  Typography,
  Box,
  IconButton,
  TextField,
  Menu
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/SaveRounded";
import CancelIcon from "@material-ui/icons/CancelRounded";
import CheckIcon from "@material-ui/icons/Check";

import steps from "./steps";
import { getStep } from "../../../redux/selectors/newRequest";
import { setStep } from "../../../redux/actions/newRequest";

import Stepper from "../../../components/Stepper/Stepper";

const getStepperSteps = steps => steps
  .filter(step => step.showInStepper)
  .map(step => step.label)

const NewRequest = props => {
  const {
    step,
    setStep
  } = props;

  const [saveAnchorEl, setSaveAnchorEl] = React.useState(null);

  const stepData = steps[step];
  const stepperSteps = getStepperSteps(steps);

  const _onNext = () => {
    setStep(Math.min(steps.length - 1, step + 1));
  }

  const _onBack = () => {
    setStep(Math.max(0, step - 1));
  }

  const _onExit = () => {
    setStep(0);
    setSaveAnchorEl(null);
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
          activeStep={step - (steps.length - stepperSteps.length)}
          setActiveStep={setStep}
          steps={stepperSteps}
        />
      </Container>
      <Box mb={3}/>
        {
          stepData.showInStepper ?
          <Container maxWidth="sm">
            <Paper elevation={3}>
              <Menu
                id="simple-menu"
                anchorEl={saveAnchorEl}
                open={Boolean(saveAnchorEl)}
                onClose={() => setSaveAnchorEl(null)}
              >
                <Box ml={3} mt={1}>
                  <form onSubmit={_onExit}>
                    <TextField size="small" variant="outlined" margin="dense" label="שם הבקשה">
                    </TextField>
                    <IconButton type="submit" size="medium">
                      <CheckIcon/>
                    </IconButton>
                  </form>
                </Box>
              </Menu>
              <IconButton size="medium" onClick={e => setSaveAnchorEl(e.currentTarget)}>
                <SaveIcon/>
              </IconButton>
              <IconButton size="medium" onClick={_onExit}>
                <CancelIcon/>
              </IconButton>
              <Box justifyContent="center" pr={5} pl={5} p={3}>
                <Typography align="left" variant="h5">
                  {stepData.header}
                </Typography>
                <StepBody/>
              </Box>
            </Paper>
          </Container>
          : <StepBody/>
        }
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
