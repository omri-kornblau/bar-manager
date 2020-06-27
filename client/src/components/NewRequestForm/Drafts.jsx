import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Tooltip
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import CustomTable from "../Table/Table";

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
      id: "action",
      label: ""
    },
  ]
}

const Drafts = props => {
  return (
    <Box>
      <Typography align="center" variant="h6">
        בקשות שטרם הושלמו
      </Typography>
      <Box mb={3}/>
      <CustomTable
        rows={fakeTableData.rows}
        columns={fakeTableData.columns}
        pagination={false}
      />
    </Box>
  );
}

Drafts.propTypes = propTypes;

export default Drafts;
