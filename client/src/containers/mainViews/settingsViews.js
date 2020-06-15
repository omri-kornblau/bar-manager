import React from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";

import Notifications from "./settingsViews/Notifications";
import MyProfile from "./settingsViews/MyProfile";
import ChangePassword from "./settingsViews/ChangePassword";

const NewRequestTypes = [
  {
    id: "notifications",
    label: "הגדרת התראות",
    icon: <NotificationsIcon/>,
    component: Notifications
  },
  {
    id: "myprofile",
    label: "פרטי חשבון",
    icon: <AccountCircleIcon/>,
    component: MyProfile
  },
  {
    id: "changepassword",
    label: "שינוי סיסמה",
    icon: <LockIcon/>,
    component: ChangePassword
  },
];

export default NewRequestTypes;
