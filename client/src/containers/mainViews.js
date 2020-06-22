import Home from "./mainViews/Home";
import AboutUs from "./mainViews/AboutUs";

import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import Settings from "./mainViews/Settings";

const Pages = [
  {
    id: "home",
    name: "בית",
    component: Home,
    hideFromNavbar: false
  },
  {
    id: "aboutus",
    name: "אודות",
    component: AboutUs,
    hideFromNavbar: false
  },
  {
    id: "lawstuff",
    name: "מסמכים משפטיים",
    component: AboutUs,
    hideFromNavbar: false
  },
  {
    id: "disclaimer",
    name: "הגבלת אחריות",
    component: AboutUs,
    hideFromNavbar: false
  },
  {
    id: "types",
    name: "סוגי ביטוח מוצעים",
    component: AboutUs,
    hideFromNavbar: false
  },
  {
    id: "contact",
    name: "צור קשר",
    component: AboutUs,
    hideFromNavbar: false
  },
  {
    id: "settings",
    name: "הגדרות",
    component: Settings,
    icon: SettingsOutlinedIcon,
    hideFromNavbar: true
  },
];

export default Pages;
