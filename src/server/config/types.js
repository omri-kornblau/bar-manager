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
  newMessage: "NewMessage",
  tenderEndWithoutOffers: "TenderProcedureWithoutOffers",
  statusUpdate: "StatusUpdated",
  offerLose: "OfferLose",
  offerSet: "OfferSet",
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

exports.COMPANY_TYPES = [
  "govermental",
  "local",
  "private",
]

exports.COMPANY_SIZES = [
  "small",
  "big",
]
