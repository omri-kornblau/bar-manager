import WelcomePage from "./WelcomePage";
import ChooseInsuranceType from "./ChooseInsuranceType";
import FillDetails from "./FillDetails";
import UploadFiles from "./UploadFiles";

const steps = [
  {
    label: "בחירת ביטוח",
    component: ChooseInsuranceType,
    header: "בחר סוג ביטוח:",
    showInStepper: true
  },
  {
    label: "מילוי פרטים",
    component: FillDetails,
    header: "מלא פרטים:",
    showInStepper: true
  },
  {
    label: "סיום התהליך",
    component: UploadFiles,
    header: "מידע אחרון וסיימנו:",
    showInStepper: true
  }
];

export default steps;
