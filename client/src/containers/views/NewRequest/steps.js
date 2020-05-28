import ChooseInsuranceType from "./ChooseInsuranceType";
import FillDetails from "./FillDetails";
import UploadFiles from "./UploadFiles";

const steps = [
  {
    label: "בחירת ביטוח",
    component: ChooseInsuranceType,
    header: "בחר סוג ביטוח:"
  },
  {
    label: "מילוי פרטים",
    component: FillDetails,
    header: "מלא פרטים:"
  },
  {
    label: "סיום התהליך",
    component: UploadFiles,
    header: "מידע אחרון וסיימנו:"
  }
];

export default steps;
