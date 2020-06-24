import { labels } from "../hebrew/request";

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
}

export const progressBar = {
  waitingForApprovel: {
    label: "בקשות המחכות לאישור מורשה חתימה",
    description: "",
    chosenHeaders: ["index", "maxPrice"],
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
  "type",
  "createdTime",
  "startDate",
  "recivedTime",
  "maxPrice",
  "insuranceDuration",
  "companyDescription",
  "assetDescription",
  "isCurrentlyInsured"
]
