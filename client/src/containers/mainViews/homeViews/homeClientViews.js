import ClientDashboard from "./clientViews/Dashboard";
import ClientProgress from "./clientViews/Progress";
import NewRequest from "./clientViews/NewRequest/NewRequest";

import DashboardIcon from "@material-ui/icons/DashboardRounded";
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
    component: ClientProgress
  },
  typeB: {
    name: "ביטוח ב'",
    icon: CommuteIcon,
    component: ClientProgress
  },
  typeC: {
    name: "ביטוח ג'",
    icon: HealingIcon,
    component: ClientProgress
  },
};

export default ClientViews;
