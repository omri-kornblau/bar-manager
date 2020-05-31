import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  Button,
  Fab,
  Box,
  Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import CustomTable from "../../../components/Table/Table";

const propTypes = {
  onNext: PropTypes.func,
  onBack: PropTypes.func
}

const createUnsavedData = (type, ctime, mtime, step) => ({ type, ctime, mtime, step });

const date = (new Date()).toISOString();

const fakeTableData = {
  rows: [
    createUnsavedData("סוג ב'", date, date, "העלאת קבצים"),
    createUnsavedData("סוג ג'", date, date, "העלאת קבצים"),
    createUnsavedData("סוג ב'", date, date, "מילוי פרטים"),
    createUnsavedData("סוג א'", date, date, "העלאת קבצים"),
  ],
  columns: [
    {
      id: "type",
      label: "סוג ביטוח"
    },
    {
      id: "ctime",
      label: "זמן יצירה"

    },
    {
      id: "mtime",
      label: "שינוי אחרון"
    },
    {
      id: "step",
      label: "שלב"
    },
  ]
}

const WelcomePage = props => {
  const {
    onNext
  } = props;

  return (
    <Container maxWidth="md">
      <Grid spacing={3} align="center" justify="center">
        <Button
          onClick={onNext}
          variant="contained"
          color="primary"
        >
          צור בקשה חדשה
          <AddIcon/>
        </Button>
        <Box m={4}/>
        <Typography variant="h6">
          או המשך עריכת בקשות קודמות:
        </Typography>
        <CustomTable
          rows={fakeTableData.rows}
          columns={fakeTableData.columns}
        />
      </Grid>
    </Container>
  );
}

WelcomePage.propTypes = propTypes;

export default WelcomePage;
