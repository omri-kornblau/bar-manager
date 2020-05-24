import ClientDashboard from "./ClientDashboard";

import DashboardIcon from "@material-ui/icons/DashboardRounded";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotesRounded";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

const ClientViews = {
  dashboard: {
    name: "תצוגה ראשית",
    icon: DashboardIcon,
    component: ClientDashboard
  },
  activerequests: {
    name: "בקשות פעילות",
    icon: SpeakerNotesIcon,
    component: ClientDashboard
  },
  newrequest: {
    name: "בקשה חדשה",
    icon: AddCircleRoundedIcon,
    component: ClientDashboard
  }
};

export default ClientViews;
