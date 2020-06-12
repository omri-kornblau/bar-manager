import React from "react";
import SearchIcon from '@material-ui/icons/Search';

import NewRequest from "./newRequestViews/NewRequestBody"

const NewRequestTypes = [
  {
    id: "typeA",
    label: "סוג א'",
    icon: <SearchIcon/>,
    component: NewRequest
  },
  {
    id: "typeB",
    label: "סוג ב'",
    icon: <SearchIcon/>,
    component: NewRequest
  },
  {
    id: "typeC",
    label: "סוג ג'",
    icon: <SearchIcon/>,
    component: NewRequest
  },
];

export default NewRequestTypes;
