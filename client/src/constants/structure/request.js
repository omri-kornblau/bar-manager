import _ from "lodash";
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
  formatTimeStampDate,
  formatLength,
  formatTimeDiff,
} from "../../helpers/formats";
import { postDeleteFile } from "../../api/client";

export const minTenderDuration = 7;
export const maxTenderDuration = 14;
export const insuranceStartTimeOffest = 2;

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
    amountOfOffers: {
      id: "offers",
      label: labels.amountOfOffers,
      formatter: formatLength,
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
        type: "date"
      }
    },
    startDate: {
      id: "startDate",
      label: labels.startDate,
      formatter: formatTimeDiff,
      filter: {
        type: "date"
      }
    },
    activeTime: {
      id: "activeTime",
      label: labels.activeTime,
      formatter: formatTimeDiff,
      filter: {
        type: "date"
      }
    },
    endTime: {
      id: "endTime",
      label: labels.endTime,
      formatter: formatTimeDiff,
      filter: {
        type: "date"
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
    action={(temp, row) => {
      const fileId = _.isNil(row.policy._id) ? row.policy : row.policy._id;
      window.open(`/${prefix}/downloadfile?fileId=${fileId}&requestId=${row._id}`, "_self");
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
    action={(temp, row) => {
      row.extraFiles.forEach((file, index)=> {
        const fileId = _.isNil(file._id) ? file : file._id;
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
    chosenHeaders: ["index", "type", "activeTime", "startDate", "maxPrice", "amountOfOffers"],
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
    chosenHeaders: ["type", "startDate", "activeTime", "endTime"],
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
    chosenHeaders: ["author", "type", "activeTime", "startDate", "maxPrice"],
  },
  waitingForSign: {
    label: "פוליסות שאושרו ומחכות לחתימה",
    description: "",
    chosenHeaders: ["author", "type", "startDate", "maxPrice"],
    actions: downloadActions("provider"),
  },
  active: {
    label: "פוליסות פעילות",
    description: "",
    chosenHeaders: ["author", "type", "endTime", "activeTime"],
    actions: downloadActions("provider"),
  },
  history: {
    label: "היסטוריה",
    description: "",
    chosenHeaders: ["author", "startDate", "activeTime", "maxPrice"],
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
  },
  {
    id: "name"
  },
  {
    id: "companyId"
  },{
    id: "address"
  },
  {
    id: "owner"
  },
  {
    id: "fieldOfActivity"
  },
  {
    id: "phoneNumber"
  }
]

export const modalEditFormStructure = [
  [
    {
      label: "פרמיה מקסימלית רצויה",
      name: "maxPrice",
      type: "number",
      fullWidth: false,
      justify: "center",
      InputProps: {
        endAdornment: <InputAdornment position="end">₪k</InputAdornment>,
      }
    }
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
