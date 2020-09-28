import _ from "lodash";

import { labels } from "../constants/hebrew/request";

const unknowErrorData = {
  message: "שגיאה לא ידועה"
}

const errMessageToText = {
  "Policy file must be provided": "יש להעלות קובץ פוליסה",
  "Extra files must be provided": "יש להעלות קבצים נוספים",
  "Price should be lower then max price": "המחיר המוצע לא נמוך מן הפרמיה המקסימלית",
  "Price should be lower then last price": "המחיר החדש לא נמוך מהנוכחי",
  "Price should be bigger then 0": "נא להכניס מספר חיובי",
  "Cannot update request with offers": "לא ניתן לעדכן בקשה אשר קיבלה הצעות ממבטחים"
}

const generalErrorToText = ({ message }) => (
  errMessageToText[message] || "משהו לא עבד כצפוי"
)

const yupErrorToText = errData => {
  const label = labels[errData.path];

  if (_.isNil(label)) return "יש בעיה בטופס";

  switch(errData.type) {
    case "min":
      const min = _.isNil(errData.params.more)
        ? typeof(errData.params.originalValue) === "string"
          ? `${errData.params.min} תווים`
          : errData.params.min 
        : errData.params.more;
      return `סעיף ${label} חייב להיות גדול מ${min}`
    case "max":
      const max = _.isNil(errData.params.more)
        ? typeof(errData.params.originalValue) === "string"
          ? `${errData.params.max} תווים`
          : errData.params.max 
        : errData.params.more;
      return `סעיף ${label} חייב להיות קטן מ${max}`
    case "required":
      return `יש למלא את סעיף ${label}`
    case "email":
      return `יש למלא אימייל תקין`
    case "matches":
      return `יש למלא ${label} תקין`
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
    try {
      return parseBoomError(errData);
    } catch {
      return {
        key: null,
        message: generalErrorToText(errData)
      };
    }
  }
}

export const parseBoomError = err => {
  const errData = JSON.parse(err.message);
  const initErr = {key: errData.path};
  switch (errData.message) {
    case "Password to short":
      return {...initErr, message: `הסיסמה צריכה להכיל לפחות ${errData.min} תווים`};
    case "Password to long":
      return {...initErr, message: `הסיסמה צריכה להכיל פחות מ${errData.max} תווים`};
    case "Incorrect password":
      return {...initErr, message: "הסיסמה לא נכונה"};
    case "Duplicate key":
      return {...initErr, message: `${labels[initErr.key]} כבר קיים`};
  }
}

export const parseOfferBoxError = err => {
  if (_.isNil(err)) return err;
  return parseFormError(err).message;
}

export const getAxiosError = err => {
  if (_.isNil(err)) return err;
  if (_.isNil(err.response)) return unknowErrorData;
  if (_.isNil(err.response.data)) return unknowErrorData;

  return err.response.data;
}
