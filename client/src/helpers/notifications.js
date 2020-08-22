import {
 statusesMessage, 
} from "../constants/hebrew/notifications";
import { notificationsTypes } from "../constants/structure/settings";

export const formatNotificationMessage = message => {
  switch (message.type) {
    case notificationsTypes.statusUpdate.name:
      return statusesMessage[message.status]
    case notificationsTypes.newMessage.name:
      return `התקבלה הודעה חדשה מ${message.from}`;
    case notificationsTypes.tenderEndWithoutOffers.name:
      return "הבקשה הגיעה לסוף הליך מכרזי בלי אף הצעה";
    case notificationsTypes.offerLose.name:
      return "ההצעה הפסידה בהליך המכרזי";
    case notificationsTypes.offerSet.name:
      return `התקבלה הצעה מ${message.from} על סך ${message.price} אלף ש"ח`
    default:
      return "message type not configured";
  }
};
