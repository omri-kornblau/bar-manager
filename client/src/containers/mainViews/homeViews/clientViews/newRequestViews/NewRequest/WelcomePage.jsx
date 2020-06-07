import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  Button,
  Box,
  Typography,
  Tooltip
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

import CustomTable from "../../../../../../components/Table/Table";

const propTypes = {
  onNext: PropTypes.func,
  onBack: PropTypes.func
}

const createUnsavedData = (name, type, ctime, mtime, step, action) => ({ name, type, ctime, mtime, step, action });

const date = (new Date()).toISOString();
const EditButton = () =>
  <Tooltip arrow title="המשך ביצירה">
    <EditIcon style={{cursor: "pointer"}} fontSize="small"/>
  </Tooltip>

const fakeTableData = {
  rows: [
    createUnsavedData("הביטוח הראשון שלי", "סוג ב'", date, date, "העלאת קבצים", <EditButton/>),
    createUnsavedData("הביטוח השני שלי", "סוג ג'", date, date, "מילוי פרטים", <EditButton/>),
    createUnsavedData("הביטוח השלישי שלי", "סוג ג'", date, date, "מילוי פרטים", <EditButton/>),
  ],
  columns: [
    {
      id: "name",
      label: "שם הבקשה"
    },
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
    {
      id: "action",
      label: ""
    },
  ]
}

const WelcomePage = props => {
  const {
    onNext
  } = props;

  return (
    <Container maxWidth="md">
      <Grid align="center">
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
          או המשך יצירת בקשות קודמות:
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
