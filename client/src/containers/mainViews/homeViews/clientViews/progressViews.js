import React from "react";
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import DoneIcon from '@material-ui/icons/Done';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import { purple, blue, yellow, green, grey } from "@material-ui/core/colors";

import EditRequests from "./progressViews/EditRequests";
import InProgressRequests from "./progressViews/InProgressRequests";
import WaitingRequests from "./progressViews/WaitingRequests";
import ActiveRequests from "./progressViews/ActiveRequests";
import ArchivedRequests from "./progressViews/ArchivedRequests";

const DashboardProgresses = [
  {
    id: "edit",
    label: "עריכה",
    icon: <EditIcon/>,
    color: purple[600],
    component: EditRequests
  },
  {
    id: "inProgress",
    label: "בתהליך",
    icon: <SearchIcon/>,
    color: blue[600],
    component: InProgressRequests
  },
  {
    id: "waitingForApproval",
    label: "מחכה לאישור",
    icon: <HourglassEmptyIcon/>,
    color: yellow[600],
    component: WaitingRequests
  },
  {
    id: "active",
    label: "פעיל",
    icon: <DoneIcon/>,
    color: green[600],
    component: ActiveRequests
  },
  {
    id: "history",
    label: "היסטוריה",
    icon: <FolderOpenIcon/>,
    color: grey[600],
    component: ArchivedRequests
  },
];

export default DashboardProgresses;
