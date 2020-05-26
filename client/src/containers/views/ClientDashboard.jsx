import React from "react";
import {
  Grid,
  Button,
} from "@material-ui/core";

const ClientDashboard = props => {
  return (
    <Grid container align="flex-start">
      <Button variant="contained" color="primary">
        Dashboard
      </Button>
    </Grid>
  );
}

export default ClientDashboard;
