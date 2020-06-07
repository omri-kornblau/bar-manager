import React from "react";
import {
  Grid,
  Button,
  Box
} from "@material-ui/core";

import FormBody from "../../../../../../components/Form/FormBody";

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

const FillDetails = props => {
  const {
    onNext,
    onBack
  } = props;

  return (
    <form>
      <FormBody
        formStructure={structure}
        spacing={3}
        margin="dense"
      />
      <Box mt={5}/>
      <Grid container justify="center">
        <Button
          onClick={onBack}
        >
          חזור
        </Button>
        <Box mr={2} ml={2}/>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={onNext}
        >
          הבא
        </Button>
      </Grid>
    </form>
  );
}

export default FillDetails;
