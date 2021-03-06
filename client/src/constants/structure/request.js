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
  formatCompanyType,
  formatCompanySize,
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
    wasInsuredOneYearAgo: {
      id: "wasInsuredOneYearAgo",
      label: labels.wasInsuredOneYearAgo,
      filter: {
        type: "bool"
      }
    },
    wasInsuredTwoYearsAgo: {
      id: "wasInsuredTwoYearsAgo",
      label: labels.wasInsuredTwoYearsAgo,
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
    startDateAbsulote: {
      id: "startDate",
      label: labels.startDate,
      formatter: formatTimeStampRTL,
      filter: {
        type: "date"
      }
    },
    startDateRelative: {
      id: "startDate",
      label: labels.startDateRelative,
      formatter: formatTimeDiff,
      filter: {
        type: "date"
      }
    },
    activeTimeAbsolute: {
      id: "activeTime",
      label: labels.activeTime,
      formatter: formatTimeStampRTL,
      filter: {
        type: "date"
      }
    },
    activeTimeRelative: {
      id: "activeTime",
      label: labels.activeTimeRelative,
      formatter: formatTimeDiff,
      filter: {
        type: "date"
      }
    },
    endTimeAbsolute: {
      id: "endTime",
      label: labels.endTime,
      formatter: formatTimeStampRTL,
      filter: {
        type: "date"
      }
    },
    endTimeRelative: {
      id: "endTime",
      label: labels.endTimeRelative,
      formatter: formatTimeDiff,
      filter: {
        type: "date"
      }
    },
    actions: {
      id: "actions",
      label: "????????????",
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
          ???????? ????????????
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
            ???????? ?????????? ????????????
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
    label: "?????????????? ?????????? ??????????",
    description: "",
    chosenHeaders: ["index", "type", "startDateRelative", "maxPrice", "amountOfOffers"],
    actions: [
      <ConnectedButton
        label="????????"
        action={(dispatch, row) => {
          dispatch(
            push(`/home/${row.type}/${row.status}?or=${row.index}&em=true`)
          )
        }}
        color="primary"
      />,
      <ConnectedButton
        label="??????"
        action={(dispatch, row) => {
          if (window.confirm("?????? ???????? ???????? ???????? ?????????? ???? ???????????")) {
            cancelRequest(dispatch)(row)
          }
        }}
        progressName="cancelRequest"
        className="failed"
      />,
    ],
  },
  waitingForSign: {
    label: "?????????????? ???????????? ???????????? ????????????",
    description: "",
    chosenHeaders: ["type", "startDateAbsulote", "activeTimeRelative", "maxPrice"],
    actions: downloadActions("client"),
  },
  active: {
    label: "?????????????? ????????????",
    description: "",
    chosenHeaders: ["type", "activeTimeRelative", "endTimeRelative"],
    actions: downloadActions("client"),
  },
  history: {
    label: "????????????????",
    description: "",
    chosenHeaders: ["index", "activeTimeAbsolute", "maxPrice"],
    actions: downloadActions("client"),
  },
}

export const providerProgressBar = {
  inTenderProcedure: {
    label: "?????????????? ?????????? ??????????",
    description: "",
    chosenHeaders: ["author", "type", "startDateRelative", "maxPrice"],
  },
  waitingForSign: {
    label: "?????????????? ???????????? ???????????? ????????????",
    description: "",
    chosenHeaders: ["author", "type", "startDateAbsulote", "activeTimeRelative", "maxPrice"],
    actions: downloadActions("provider"),
  },
  active: {
    label: "?????????????? ????????????",
    description: "",
    chosenHeaders: ["author", "type", "activeTimeRelative", "endTimeRelative"],
    actions: downloadActions("provider"),
  },
  history: {
    label: "????????????????",
    description: "",
    chosenHeaders: ["author", "activeTimeAbsolute", "maxPrice"],
    actions: downloadActions("provider"),
  },
}

export const providerPoolChosenHeaders = {
  chosenHeaders: ["type", "createdAt", "maxPrice", "insuranceDuration", "author"],
  actions: downloadActions("provider"),
};

export const modalChosenHeaders = [
  {
    id: "startDate",
    label: labels.startDateRelative,
    formatter: formatTimeDiff
  },
  {
    id: "activeTime",
    label: labels.activeTimeRelative,
    formatter: formatTimeDiff
  },
  {
    id: "endTime",
    label: labels.endTimeRelative,
    formatter: formatTimeDiff
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
    id: "wasInsuredOneYearAgo",
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
  },
  {
    id: "companyType",
    formatter: formatCompanyType,
  }, {
    id: "companySize",
    formatter: formatCompanySize,
  }
]

export const modalEditFormStructure = [
  [
    {
      label: "?????????? ???????????????? ??????????",
      name: "maxPrice",
      type: "number",
      fullWidth: false,
      justify: "center",
      InputProps: {
        endAdornment: <InputAdornment position="end">???k</InputAdornment>,
      }
    }
  ],[
    {
      label: "???????? ????????????",
      name: "policy",
      type: "file",
      justify: "center",
      enableDelete: true,
    },{
      label: "?????????? ????????????",
      name: "extraFiles",
      type: "file",
      justify: "center",
      multiple: true,
      enableDelete: true,
      onDeletePredefinedFile: fileId => {
        if (window.confirm("?????? ???????? ???????? ???????? ?????????? ???????? ?????")) {
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
