import ClientDashboard from "./clientViews/Dashboard";
import NewRequest from "./clientViews/NewRequest/NewRequest";

import DashboardIcon from "@material-ui/icons/DashboardRounded";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotesRounded";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import CommuteIcon from '@material-ui/icons/Commute';
import HealingIcon from '@material-ui/icons/Healing';
import BusinessIcon from '@material-ui/icons/Business';

const ClientViews = {
  newrequest: {
    name: "בקשה חדשה",
    icon: AddCircleRoundedIcon,
    component: NewRequest
  },
  dashboard: {
    name: "תצוגה ראשית",
    icon: DashboardIcon,
    component: ClientDashboard
  },
  typeA: {
    name: "ביטוח א'",
    icon: BusinessIcon,
    component: ClientDashboard
  },
  typeB: {
    name: "ביטוח ב'",
    icon: CommuteIcon,
    component: ClientDashboard
  },
  typeC: {
    name: "ביטוח ג'",
    icon: HealingIcon,
    component: ClientDashboard
  },
};

export default ClientViews;
