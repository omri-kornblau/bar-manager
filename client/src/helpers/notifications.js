export const formatNotificationMessage = message => {
  switch (message.type) {
    case "Status updated":
      return `בקשה עברה לסטטוס ${message.status}`
    case "New Message":
      return `התקבלה הודעה חדשה מ${message.from}`
    default:
      return "message type not configured"
  }
};
