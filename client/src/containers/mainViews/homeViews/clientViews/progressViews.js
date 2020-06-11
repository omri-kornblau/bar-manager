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
    color: purple[300],
    component: EditRequests
  },
  {
    id: "inProgress",
    label: "בתהליך",
    icon: <SearchIcon/>,
    color: blue[300],
    component: InProgressRequests
  },
  {
    id: "waitingForApproval",
    label: "מחכה לאישור",
    icon: <HourglassEmptyIcon/>,
    color: yellow[300],
    component: WaitingRequests
  },
  {
    id: "active",
    label: "פעיל",
    icon: <DoneIcon/>,
    color: green[300],
    component: ActiveRequests
  },
  {
    id: "history",
    label: "היסטוריה",
    icon: <FolderOpenIcon/>,
    color: grey[300],
    component: ArchivedRequests
  },
];

export default DashboardProgresses;
