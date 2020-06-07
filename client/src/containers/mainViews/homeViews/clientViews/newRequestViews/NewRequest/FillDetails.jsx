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
      label: "תיאור תמציתי של הנכס",
      fullWidth: true,
      required: true
    },
  ],
  [
    {
      label: "תקופת הביטוח הרצויה (חודשים)",
      type: "number",
      fullWidth: true,
      justify: "center",
      required: true
    },
    {
      label: "פרמיה מקסימלית רצויה",
      fullWidth: false,
      justify: "center",
      type: "number",
      required: true
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
      <Grid spacing={3} container direction="column" align="center">
        <Box m={1}/>
        <Grid item>
          <Button
            type="submit"
            variant="outlined"
            color="default"
          >
            העלה פוליסה
          </Button>
        </Grid>
        <Grid item>
          <Button
            type="submit"
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
