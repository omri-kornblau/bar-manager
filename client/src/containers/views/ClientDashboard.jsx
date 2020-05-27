import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
} from "@material-ui/core";

import CustomTable from "../../components/Table/Table";

const ClientDashboard = props => {
  return (
    <>
      <Grid container alignItems="flex-end">
        <Typography variant="h4" color="inherit">
          <Box fontWeight="fontWeightBold" marginRight={2}>
            שלום משתמש 1
          </Box>
        </Typography>
        <Typography variant="h6" color="inherit">
          ביקורך האחרון היה בתאריך 13/05/2020 בשעה 18:26
        </Typography>
      </Grid>
      <Box height={20}/>
      <Grid container justify="space-evenly" spacing={10} direction="row">
        <Grid item>
          <Typography variant="h6" color="inherit" align="center">
            התראות חדשות
          </Typography>
          <Paper>
            <CustomTable  rows={[{a:1}, {a:2}]} columns={[{id: 'a', label: 'a', filter: {type: 'text'}}]}/>
          </Paper>
        </Grid>
        <Grid item>
          <Typography variant="h6" color="inherit" align="center">
            פוליסות פעילות
          </Typography>
          <Paper>
            <CustomTable  rows={[{a:1}, {a:2}]} columns={[{id: 'a', label: 'a', filter: {type: 'text'}}]}/>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default ClientDashboard;
