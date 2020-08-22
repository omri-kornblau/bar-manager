import _ from "lodash";
import {
  clientForm as clientSignupForm,
  providerForm as providerSignupForm,
} from "./signup";

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

const omitForm = originalForm =>
  originalForm
    .filter(row => 
      row[0].type !== "password"
    ).map(row =>
      row.filter(column =>
        column.name !== "username"
      )
    );

export const updateProviderDetails = omitForm(providerSignupForm);

export const updateClientDetails = omitForm(clientSignupForm)

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
