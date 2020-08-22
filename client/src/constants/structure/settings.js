export const changePassword =
  [[
    {
      label: "סיסמה ישנה",
      type: "password",
      name: "previosPassword",
      required: true,
    },
  ],
  [
    {
      label: "סיסמה חדשה",
      type: "password",
      name: "newPassword",
      required: true,
    },
  ],
  [
    {
      label: "אימות סיסמה חדשה",
      type: "password",
      name: "reNewPassword",
      required: true,
    },
  ]
];

export const updateAccountDetaild =
  [[
    {
      label: "שם",
      fullWidth: true,
      name: "name",
    },
  ],
  [
    {
      label: "אימייל",
      name: "email",
      type: "email",
      fullWidth: true,
    },
  ],
];

export const notificationsTypes = {
  newMessage: {
    name: "NewMessage",
    label: "התקבלה הודעה חדשה",
  },
  tenderEndWithoutOffers: {
    name: "TenderProcedureWithoutOffers",
    label: "הליך מכרזי נגמר בלי הצעות",
  },
  statusUpdate: {
    name: "StatusUpdated",
    label: "סטטוס של בקשה השתנה",
  },
  offerLose: {
    name: "OfferLose",
    label: "הצעה הפסידה",
  },
  offerSet: {
    name: "OfferSet",
    label: "התקבלה הצעה חדשה",
  },
};

export const clientNotificationsTypes = [
  "newMessage",
  "tenderEndWithoutOffers",
  "statusUpdate",
  "offerSet",
];

export const providerNotificationsTypes = [
  "newMessage",
  "statusUpdate",
  "offerLose",
]
