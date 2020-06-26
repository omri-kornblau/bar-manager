import React from "react";
import {
  InputAdornment
} from "@material-ui/core"

import { labels } from "../hebrew/request";

import ConnectedButton from "../../components/ConnectedButton/ConnectedButton";

import {
  formatYesNo,
  formatTimeStampRTL,
  formatShekel,
  formatMonths,
} from "../../helpers/formats";


export const tableHeaders = {
    index: {
      id: "index",
      label: labels.index,
      filter: {
        type: "number"
      }
    },
    type: {
      id: "type",
      label: labels.type,
      filter: {
        type: "text"
      }
    },
    author: {
      id: "author",
      label: labels.author,
      filter: {
        type: "text"
      }
    },
    status: {
      id: "status",
      label: labels.status,
      filter: {
        type: "text"
      }
    },
    assetDescription: {
      id: "assetDescription",
      label: labels.assetDescription,
    },
    companyDescription: {
      id: "companyDescription",
      label: labels.companyDescription,
    },
    insuranceDuration: {
      id: "insuranceDuration",
      label: labels.insuranceDuration,
      filter: {
        type: "number"
      }
    },
    maxPrice: {
      id: "maxPrice",
      label: labels.maxPrice,
      filter: {
        type: "number"
      }
    },
    comments: {
      id: "comments",
      label: labels.comments,
    },
    isCurrentlyInsured: {
      id: "isCurrentlyInsured",
      label: labels.isCurrentlyInsured,
      filter: {
        type: "bool"
      }
    },
    createdTime: {
      id: "createdTime",
      label: labels.createdTime,
      filter: {
        // type: "date"
        type: "text"
      }
    },
    startDate: {
      id: "startDate",
      label: labels.startDate,
      filter: {
        // type: "date"
        type: "text"
      }
    },
    recivedTime: {
      id: "recivedTime",
      label: labels.recivedTime,
      filter: {
        // type: "date"
        type: "text"
      }
    },
    actions: {
      id: "actions",
      label: "פעולות",
      filter: false,
      sort: false,
    },
}

export const progressBar = {
  waitingForApproval: {
    label: "בקשות המחכות לאישור מורשה חתימה",
    description: "",
    chosenHeaders: ["index", "maxPrice"],
    actions: [
      <ConnectedButton label="אשר" action={(_, row) => console.log("ACCEPT", row)} className="success"/>,
      <ConnectedButton label="בטל" action={(_, row) => console.log("CANCEL", row)} className="failed"/>,
    ],
  },
  inTenderProcedure: {
    label: "פוליסות בהליך מכרזי",
    description: "",
    chosenHeaders: ["type", "recivedTime", "maxPrice"],
  },
  waitingForSign: {
    label: "פוליסות שאושרו ומחכות לחתימה",
    description: "",
    chosenHeaders: ["type", "startDate", "maxPrice"],
  },
  active: {
    label: "פוליסות פעילות",
    description: "",
    chosenHeaders: ["type", "startDate", "recivedTime"],
  },
  history: {
    label: "היסטוריה",
    description: "",
    chosenHeaders: ["index", "startDate", "recivedTime", "maxPrice"],
  },
}

export const modalChosenHeaders = [
  {
    id: "type"
  },
  {
    id: "createdTime",
    formatter: formatTimeStampRTL
  },
  {
    id: "startDate"
  },
  {
    id: "recivedTime"
  },
  {
    id: "maxPrice",
    formatter: formatShekel
  },
  {
    id: "insuranceDuration",
    formatter: formatMonths
  },
  {
    id: "companyDescription"
  },
  {
    id: "assetDescription"
  },
  {
    id: "isCurrentlyInsured",
    formatter: formatYesNo
  },
  {
    id: "comments"
  }
]

export const modalEditFormStructure = [
  [
    {
      label: "תקופת הביטוח הרצויה",
      type: "number",
      name: "insuranceDuration",
      justify: "center",
      required: true,
      InputProps: {
        endAdornment: <InputAdornment position="end">חודשים</InputAdornment>,
      }
    },
  ],[
    {
      label: "פרמיה מקסימלית רצויה",
      name: "maxPrice",
      type: "number",
      InputProps: {
        endAdornment: <InputAdornment position="end">₪k</InputAdornment>,
      }
    }
  ],[
    {
      label: "הערות",
      name: "comments",
      multiline: true,
      rows: 2,
      placeholder: "הכנס הערות כאן..."
    },
  ],[
    {
      label: "תיאור תמציתי של הנכס",
      name: "assetDescription",
      multiline: true,
      rows: 2,
      placeholder: "הכנס תיאור כאן.."
    },
  ],[
    {
      label: "תיאור תמציתי של החברה",
      name: "companyDescription",
      multiline: true,
      rows: 2,
      placeholder: "הכנס תיאור כאן.."
    },
  ],[
    {
      label: "מבוטח כרגע",
      name: "isCurrentlyInsured",
      type: "checkbox",
    },
  ]
];
