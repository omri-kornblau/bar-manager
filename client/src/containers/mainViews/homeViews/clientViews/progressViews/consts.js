export const columnsTypes = {
    index: {
      id: "index",
      label: "מזהה",
      filter: {
        type: "number"
      }
    },
    type: {
      id: "type",
      label: "סוג פוליסה",
      filter: {
        type: "text"
      }
    },
    author: {
      id: "author",
      label: "בעלים",
      filter: {
        type: "text"
      }
    },
    status: {
      id: "status",
      label: "סוג ביטוח",
      filter: {
        type: "text"
      }
    },
    assetDescription: {
      id: "assetDescription",
      label: "תיאור הערך",
    },
    companyDescription: {
      id: "companyDescription",
      label: "תיאור החברה",
    },
    insurenceDuration: {
      id: "insurenceDuration",
      label: "תקופת הביטוח",
      filter: {
        type: "number"
      }
    },
    maxPrice: {
      id: "maxPrice",
      label: "מחיר מבוקש",
      filter: {
        type: "number"
      }
    },
    comments: {
      id: "comments",
      label: "הערות",
    },
    isCurrentlyInsured: {
      id: "isCurrentlyInsured",
      label: "האם מבוטח כרגע",
      filter: {
        type: "bool"
      }
    },
    createdTime: {
      id: "createdTime",
      label: "זמן יצירה",
      filter: {
        // type: "date"
        type: "text"
      }
    },
    startDate: {
      id: "startDate",
      label: "זמן התחלה",
      filter: {
        // type: "date"
        type: "text"
      }
    },
    recivedTime: {
      id: "recivedTime",
      label: "זמן קבלה",
      filter: {
        // type: "date"
        type: "text"
      }
    },
}

export const progressConf = {
  waitingForApprovel: {
    label: "בקשות המחכות לאישור מורשה חתימה",
    description: "",
    columns: ["index", "maxPrice"], 
  },
  inTenderProcedure: {
    label: "פוליסות בהליך מכרזי",
    description: "",
    columns: ["type", "recivedTime", "maxPrice"], 
  },
  waitingForSign: {
    label: "פוליסות שאושרו ומחכות לחתימה",
    description: "",
    columns: ["type", "startDate", "maxPrice"], 
  },
  active: {
    label: "פוליסות פעילות",
    description: "",
    columns: ["type", "startDate", "recivedTime"], 
  },
  history: {
    label: "היסטוריה",
    description: "",
    columns: ["index", "startDate", "recivedTime", "maxPrice"], 
  },
}
