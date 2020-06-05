import ClientDashboard from "./ClientDashboard";
import ClientActiveRequests from "./ClientActiveRequests";
import NewRequest from "./NewRequest/NewRequest";

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
    component: ClientActiveRequests
  },
  typeB: {
    name: "ביטוח ב'",
    icon: CommuteIcon,
    component: ClientActiveRequests
  },
  typeC: {
    name: "ביטוח ג'",
    icon: HealingIcon,
    component: ClientActiveRequests
  },
};

export default ClientViews;
