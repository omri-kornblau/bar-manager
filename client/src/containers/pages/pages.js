import Home from "./Home";
import AboutUs from "./AboutUs";

const Pages = {
  home: {
    name: "בית",
    component: Home
  },
  aboutus: {
    name: "אודות",
    component: AboutUs
  },
  lawstuff: {
    name: "מסמכים משפטיים",
    component: AboutUs
  },
  disclaimer: {
    name: "הגבלת אחריות",
    component: AboutUs
  },
  types: {
    name: "סוגי ביטוח מוצעים",
    component: AboutUs
  },
  contact: {
    name: "צור קשר",
    component: AboutUs
  },
};

export default Pages;
