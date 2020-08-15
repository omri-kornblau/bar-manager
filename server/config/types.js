exports.USER_TYPES = {
  client: "client",
  provider: "provider",
}

exports.REQUEST_STATUSES  = [
  "inTenderProcedure",
  "waitingForSign",
  "active",
  "history",
];

exports.INSURENSE_TYPES = ["typeA", "typeB", "typeC"];

exports.NOTIFICATIONS_TYPES = {
  newMessage: "New Message",
  tenderEndWithoutOffers: "Tender Procedure Without Offers",
  statusUpdate: "Status updated",
  offerLose: "Offer lose",
  offerSet: "Offer set",
};

exports.CLIENT_NOTIFICATIONS_TYPES = [
  "newMessage",
  "tenderEndWithoutOffers",
  "statusUpdate",
  "offerSet",
];

exports.PROVIDER_NOTIFICATIONS_TYPES = [
  "newMessage",
  "statusUpdate",
  "offerLose",
]
