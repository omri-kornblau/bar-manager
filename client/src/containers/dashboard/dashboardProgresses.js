import React from "react";
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import DoneIcon from '@material-ui/icons/Done';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

import MainView from "./Main"

const DashboardProgresses = [
  {
    id: "edit",
    label: "עריכה",
    icon: <EditIcon/>,
    color: "purple",
    component: MainView
  },
  {
    id: "inProgress",
    label: "בתהליך",
    icon: <SearchIcon/>,
    color: "blue",
    component: <h1>hello 2</h1>
  },
  {
    id: "waitingForApproval",
    label: "מחכה לאישור",
    icon: <HourglassEmptyIcon/>,
    color: "yellow",
    component: <h1>hello 3</h1>
  },
  {
    id: "active",
    label: "פעיל",
    icon: <DoneIcon/>,
    color: "green",
    component: <h1>hello 4</h1>
  },
  {
    id: "history",
    label: "היסטוריה",
    icon: <FolderOpenIcon/>,
    color: "grey",
    component: <h1>hello 5</h1>
  },
];

export default DashboardProgresses;
