export const READ_NOTIFICATION = "READ_NOTIFICATION";

export const readNotification = notificationId => ({
  type: READ_NOTIFICATION,
  payload: {notificationId},
});
