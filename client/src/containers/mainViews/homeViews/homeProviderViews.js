import ProviderDashboard from "./providerViews/Dashboard";
import ProviderRequestsPool from "./providerViews/RequestsPool";
import ProviderProgress from "./providerViews/Progress";

import DashboardIcon from "@material-ui/icons/DashboardRounded";
import CommuteIcon from '@material-ui/icons/Commute';
import HealingIcon from '@material-ui/icons/Healing';
import BusinessIcon from '@material-ui/icons/Business';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const ProviderViews = {
  dashboard: {
    name: "תצוגה ראשית",
    icon: DashboardIcon,
    component: ProviderDashboard
  },
  requestspool: {
    name: "בקשות חדשות",
    icon: MenuBookIcon,
    component: ProviderRequestsPool
  },
  typeA: {
    name: "ביטוח א'",
    icon: BusinessIcon,
    component: ProviderProgress
  },
  typeB: {
    name: "ביטוח ב'",
    icon: CommuteIcon,
    component: ProviderProgress
  },
  typeC: {
    name: "ביטוח ג'",
    icon: HealingIcon,
    component: ProviderProgress
  },
};

export default ProviderViews;
