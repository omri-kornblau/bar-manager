import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Box,
  Fab
} from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";

const propTypes = {
  onNext: PropTypes.func,
  onBack: PropTypes.func
}

const ChooseInsuranceType = props => {
  const {
    onNext
  } = props;

  return (
    <Box mt={4} mb={4}>
      <Grid spacing={5} container justify="center">
        <Grid item>
          <Fab
            variant="extended"
            size="large"
            color="primary"
            onClick={onNext}
          >
            <NavigationIcon/>
            סוג א'
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            size="large"
            color="primary"
            onClick={onNext}
          >
            <NavigationIcon/>
            סוג ב'
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            size="large"
            color="primary"
            onClick={onNext}
          >
            <NavigationIcon/>
            סוג ג'
          </Fab>
        </Grid>
      </Grid>
    </Box>
  );
}

ChooseInsuranceType.propTypes = propTypes;

export default ChooseInsuranceType;
