import _ from "lodash";

import { labels } from "../constants/hebrew/request";

const unknowErrorData = {
  message: "שגיאה לא ידועה"
}

const errMessageToText = {
  "Policy file must be provided": "יש להעלות קובץ פוליסה",
  "Extra files must be provided": "יש להעלות קבצים נוספים",
}

const generalErrorToText = ({ message }) => (
  errMessageToText[message] || "משהו לא עבד כצפוי"
)

const yupErrorToText = errData => {
  const label = labels[errData.path];

  if (_.isNil(label)) return "יש בעיה בטופס";

  switch(errData.type) {
    case "min":
      return `סעיף ${label} חייב להיות גדול מ${errData.params.more}`
    case "max":
      return `סעיף ${label} חייב להיות קטן מ${errData.params.more}`
    case "required":
      return `יש למלא את סעיף ${label}`
    default:
      return `יש לתקן את סעיף ${label}`
  }
}

export const parseFormError = err => {
  if (_.isNil(err)) return err;

  const errData = getAxiosError(err);

  if (errData.name === "ValidationError") {
    return {
      key: errData.path,
      message: yupErrorToText(errData)
    }
  } else {
    return {
      key: null,
      message: generalErrorToText(errData)
    }
  }
}

export const getAxiosError = err => {
  if (_.isNil(err)) return err;
  if (_.isNil(err.response)) return unknowErrorData;
  if (_.isNil(err.response.data)) return unknowErrorData;

  return err.response.data;
}
