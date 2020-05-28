import React from "react";
import {
  Grid,
  Button,
  Box
} from "@material-ui/core";

const UploadFiles = props => {
  const {
    onNext,
    onBack
  } = props;

  return (
    <>
      <Grid spacing={3} container direction="column" align="center">
        <Box m={1}/>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            העלה פוליסה
          </Button>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            העלה קבצים נוספים
          </Button>
        </Grid>
      </Grid>
      <Box m={10}/>
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
          סיים
        </Button>
      </Grid>
    </>
  );
}

export default UploadFiles;
