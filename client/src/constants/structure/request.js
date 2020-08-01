import React from "react";
import { push } from "connected-react-router";
import {
  InputAdornment, Grid
} from "@material-ui/core"
import GetAppIcon from '@material-ui/icons/GetApp';

import { labels } from "../hebrew/request";

import ConnectedButton from "../../components/ConnectedButtons/ConnectedButton";
import ConnectedLink from "../../components/ConnectedButtons/ConnectedLink";
import {
  cancelRequest,
} from "../../redux/thunks/client"

import {
  formatAccept,
  formatActions,
  formatYesNo,
  formatTimeStampRTL,
  formatShekel,
  formatMonths,
} from "../../helpers/formats";
import { postDeleteFile } from "../../api/client";


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
      formatter: formatShekel,
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
    createdAt: {
      id: "createdAt",
      label: labels.createdAt,
      formatter: formatTimeStampRTL,
      filter: {
        // type: "date"
        type: "text"
      }
    },
    startDate: {
      id: "startDate",
      label: labels.startDate,
      formatter: formatTimeStampRTL,
      filter: {
        // type: "date"
        type: "text"
      }
    },
    activeTime: {
      id: "activeTime",
      label: labels.activeTime,
      formatter: formatTimeStampRTL,
      filter: {
        // type: "date"
        type: "text"
      }
    },
    actions: {
      id: "actions",
      label: "פעולות",
      formatter: formatActions,
      filter: false,
      sort: false,
    },
}

const downloadActions = prefix => [
  <ConnectedLink
    label={
        <Grid container>
          <GetAppIcon/>
          הורד פוליסה
        </Grid>
    }
    action={(_, row) => {
      window.open(`/${prefix}/downloadfile?fileId=${row.policy}&requestId=${row._id}`, "_self");
    }}
    color="primary"
  />,
  <ConnectedLink
    label={
        <Grid container>
          <GetAppIcon/>
            הורד קבצים נוספים
        </Grid>
    }
    action={(_, row) => {
      row.extraFiles.forEach((fileId, index)=> {
        const action = index + 1 === row.extraFiles.length
        ? "_self"
        : "blank";
        window.open(`/${prefix}/downloadfile?fileId=${fileId}&requestId=${row._id}`, action);
      })
    }}
  />,
]

export const clientProgressBar = {
  inTenderProcedure: {
    label: "פוליסות בהליך מכרזי",
    description: "",
    chosenHeaders: ["index", "type", "activeTime", "startDate", "maxPrice"],
    actions: [
      <ConnectedButton
        label="ערוך"
        action={(dispatch, row) => {
          dispatch(
            push(`/home/${row.type}/${row.status}?or=${row.index}&em=true`)
          )
        }}
        color="primary"
      />,
      <ConnectedButton
        label="בטל"
        action={(dispatch, row) => {
          if (window.confirm("אתה בטוח שאתה רוצה למחוק את הבקשה?")) {
            cancelRequest(dispatch)(row)
          }
        }}
        progressName="cancelRequest"
        className="failed"
      />,
    ],
  },
  waitingForSign: {
    label: "פוליסות שאושרו ומחכות לחתימה",
    description: "",
    chosenHeaders: ["type", "startDate", "maxPrice"],
    actions: downloadActions("client"),
  },
  active: {
    label: "פוליסות פעילות",
    description: "",
    chosenHeaders: ["type", "startDate", "activeTime"],
    actions: downloadActions("client"),
  },
  history: {
    label: "היסטוריה",
    description: "",
    chosenHeaders: ["index", "startDate", "activeTime", "maxPrice"],
    actions: downloadActions("client"),
  },
}

export const providerProgressBar = {
  inTenderProcedure: {
    label: "פוליסות בהליך מכרזי",
    description: "",
    chosenHeaders: ["index", "type", "activeTime", "startDate", "maxPrice"],
  },
  waitingForSign: {
    label: "פוליסות שאושרו ומחכות לחתימה",
    description: "",
    chosenHeaders: ["type", "startDate", "maxPrice"],
    actions: downloadActions("provider"),
  },
  active: {
    label: "פוליסות פעילות",
    description: "",
    chosenHeaders: ["type", "startDate", "activeTime"],
    actions: downloadActions("provider"),
  },
  history: {
    label: "היסטוריה",
    description: "",
    chosenHeaders: ["index", "startDate", "activeTime", "maxPrice"],
    actions: downloadActions("provider"),
  },
}

export const providerPoolChosenHeaders = {
  chosenHeaders: ["type", "createdAt", "maxPrice", "insuranceDuration", "author"],
  actions: downloadActions("provider"),
};

export const modalChosenHeaders = [
  {
    id: "type"
  },
  {
    id: "createdAt",
    formatter: formatTimeStampRTL
  },
  {
    id: "startDate",
    formatter: formatTimeStampRTL
  },
  {
    id: "activeTime",
    formatter: formatTimeStampRTL
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
  ],[
    {
      label: "העלה פוליסה",
      name: "policy",
      type: "file",
      justify: "center",
      enableDelete: true,
    },{
      label: "קבצים נוספים",
      name: "extraFiles",
      type: "file",
      justify: "center",
      multiple: true,
      enableDelete: true,
      onDeletePredefinedFile: fileId => {
        if (window.confirm("אתה בטוח שאתה רוצה למחוק קובץ זה?")) {
          postDeleteFile(fileId)
        }
      }
    },
  ],
];

export const providerModalFeatures = {
  inTenderProcedure: {
    offer: true,
    messages: true
  },
  waitingForSign: {
    offer: false,
    messages: true
  },
  active: {
    offer: false,
    messages: true
  }
}
