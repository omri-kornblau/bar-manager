import { labels } from "../hebrew/request";
import {
  formatTimeStampRTL,
} from "../../helpers/formats";
import {
  formatNotificationMessage,
} from "../../helpers/notifications"

export const tableHeaders = {
    index: {
      id: "requestId",
      label: labels.index,
      filter: {
        type: "number"
      }
    },
    type: {
      id: "requestType",
      label: labels.type,
      filter: {
        type: "text"
      }
    },
    message: {
      id: "message",
      label: "הודעה",
      formatter: formatNotificationMessage,
      filter: {
        type: "text"
      }
    },
    createdAt: {
      id: "time",
      label: labels.createdAt,
      formatter: formatTimeStampRTL,
      filter: {
        // type: "date"
        type: "text"
      }
    },
}

export const chosenHeaders= ["index", "type", "message", "createdAt"];
