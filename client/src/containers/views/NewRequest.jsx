import React from "react";
import {
  Paper,
  Container,
  Typography,
  Box,
  Button,
  Grid
} from "@material-ui/core";

import FormBody from "../../components/Form/FormBody";

const structure =
  [[
    {
      label: "שם",
      fullWidth: false,
      required: true
    },
  ],
  [
    {
      label: "סתם שדה צר",
    },
    {
      label: "סיסמה",
      type: "password"
    },
  ],
  [
    {
      label: "סתם שדה"
    }
  ],
  [
    {
      type: "date",
      label: "אימייל"
    }
  ]
];

const NewRequest = props => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <Box justifyContent="center" pr={5} pl={5} p={3}>
          <Typography align="left" variant="h5">
            הכנס פרטים:
          </Typography>
          <form>
            <FormBody
              formStructure={structure}
              spacing={3}
              margin="dense"
            />
            <Box mt={5}/>
            <Grid container justify="center">
              <Button type="submit" variant="contained" color="primary">
                שלח
              </Button>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

export default NewRequest;
