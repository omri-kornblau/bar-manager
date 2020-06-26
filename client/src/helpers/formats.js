import Moment from "moment";

export const applyFormat = (value, formatter) =>
  !!formatter ? formatter(value) : value

export const formatYesNo = val => val ? "כן" : "לא";
export const formatShekel = val =>  `${val} אלף ש"ח`;
export const formatMonths = val =>  `${val} חודשים`;
export const formatTimeStampRTL = time => Moment(time).format("HH:mm:ss YYYY/MM/DD");
