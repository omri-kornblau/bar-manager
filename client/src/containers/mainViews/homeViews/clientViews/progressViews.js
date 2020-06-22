import React from "react";
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import DoneIcon from '@material-ui/icons/Done';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import { purple, blue, yellow, green, grey } from "@material-ui/core/colors";

import TableView from "./progressViews/TableView";

const DashboardProgresses = [
  {
    id: "waitingForApprovel",
    label: "מחכה לאישור חתימה",
    icon: <EditIcon/>,
    color: purple[600],
    component: TableView,
  },
  {
    id: "inTenderProcedure",
    label: "בהליך מכרזי",
    icon: <SearchIcon/>,
    color: blue[600],
    component: TableView,
  },
  {
    id: "waitingForSign",
    label: "בתהליך חתימה",
    icon: <HourglassEmptyIcon/>,
    color: yellow[600],
    component: TableView,
  },
  {
    id: "active",
    label: "פוליסות פעילות",
    icon: <DoneIcon/>,
    color: green[600],
    component: TableView,
  },
  {
    id: "history",
    label: "היסטוריה",
    icon: <FolderOpenIcon/>,
    color: grey[600],
    component: TableView,
  },
];

export default DashboardProgresses;
