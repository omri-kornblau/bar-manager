import React, { useCallback } from "react";
import {
  Container,
  Button,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";

import FormBody from "../../../components/Form/FormBody";

const structure =
  [[
    {
      label: "שם",
      fullWidth: true,
      required: true,
    },
  ],
  [
    {
      label: "אימייל",
      type: "email",
      fullWidth: true,
      required: true,
    },
  ],
  [
    {
      label: "מספר טלפון",
      type: "number",
      required: true,
      fullWidth: false,
      justify: "center"
    },
  ]
];

const MyProfile = props => {
  const onUpdateDetails = useCallback(() => {

  }, []);

  return (
    <Container>
      <Typography align="center" variant="h5">
        עדכן פרטי חשבון
      </Typography>
      <form onSubmit={onUpdateDetails}>
        <FormBody
          formStructure={structure}
          spacing={3}
          margin="dense"
        />
        <Box mt={7}/>
        <Grid justify="center" container>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            עדכן
          </Button>
        </Grid>
      </form>
    </Container>
  );
}

export default MyProfile;
