export const formatNotificationMessage = message => {
  switch (message.type) {
    case "Status updated":
      return `בקשה עברה לסטטוס ${message.status}`
    default:
      return "message type not configured"
  }
};
