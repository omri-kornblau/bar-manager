import React from "react";
import {
  Grid,
  Button,
  Box,
  InputAdornment
} from "@material-ui/core";

import FormBody from "../Form/FormBody";

const structure =
  [[
    {
      label: "תיאור תמציתי של הנכס",
      fullWidth: true,
      required: true,
      multiline: true,
      rows: 2,
      placeholder: "הכנס תיאור כאן.."
    },
  ],
  [
    {
      label: "תקופת הביטוח הרצויה",
      type: "number",
      fullWidth: true,
      justify: "center",
      required: true,
      InputProps: {
        endAdornment: <InputAdornment position="end">חודשים</InputAdornment>,
      }
    },
    {
      label: "פרמיה מקסימלית רצויה",
      fullWidth: false,
      justify: "center",
      type: "number",
      required: true,
      InputProps: {
        endAdornment: <InputAdornment position="end">₪k</InputAdornment>,
      }
    }
  ],
  [
    {
      label: "תאריך אחרון לקבלת הצעות",
      type: "date"
    },
    {
      label: "מועד מבוקש להעמדת פוליסה",
      type: "date"
    },
  ]
];

const FillDetails = props => {
  const {
    onNext,
  } = props;

  return (
    <form>
      <FormBody
        formStructure={structure}
        spacing={3}
        margin="dense"
      />
      <Box mt={5}/>
      <Grid spacing={3} container direction="column" align="center">
        <Box m={1}/>
        <Grid item>
          <Button
            variant="outlined"
            color="default"
          >
            העלה פוליסה
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="default"
          >
            העלה קבצים נוספים
          </Button>
        </Grid>
      </Grid>
      <Box mt={7}/>
      <Grid container justify="center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={onNext}
        >
          שלח בקשה
        </Button>
      </Grid>
    </form>
  );
}

export default FillDetails;
