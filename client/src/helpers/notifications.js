import {
 statusesMessage, 
} from "../constants/hebrew/notifications";
export const formatNotificationMessage = message => {
  switch (message.type) {
    case "Status updated":
      return statusesMessage[message.status]
    case "New Message":
      return `התקבלה הודעה חדשה מ${message.from}`
    default:
      return "message type not configured"
  }
};
