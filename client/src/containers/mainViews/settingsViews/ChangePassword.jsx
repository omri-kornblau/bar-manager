import React, { useCallback } from "react";
import {
  Container,
  Button,
  Typography,
  Grid,
  Box
} from "@material-ui/core";

import FormBody from "../../../components/Form/FormBody";

const structure =
  [[
    {
      label: "סיסמה ישנה",
      type: "password",
      required: true,
    },
  ],
  [
    {
      label: "סיסמה חדשה",
      type: "password",
      required: true,
    },
  ],
  [
    {
      label: "אימות סיסמה חדשה",
      type: "password",
      required: true,
    },
  ]
];

const ChangePassword = props => {
  const onChangePassword = useCallback(() => {

  }, []);

  return (
    <Container>
      <Typography align="center" variant="h5">
        בחר סיסמה חדשה
      </Typography>
      <form onSubmit={onChangePassword}>
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
            עדכן סיסמה
          </Button>
        </Grid>
      </form>
    </Container>
  );
}

export default ChangePassword;
