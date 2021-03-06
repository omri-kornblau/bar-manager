import { push } from "connected-react-router";

import {
  tryGetClient,
  getClientSuccess,
  getClientFailure,
  tryCreateRequest,
  createRequestSuccess,
  createRequestFailure,
  tryUpdateRequest,
  updateRequestSuccess,
  updateRequestFailure,
  tryAcceptRequest,
  acceptRequestSuccess,
  acceptRequestFailure,
  tryCancelRequest,
  canceleRequestSuccess,
  canceleRequestFailure,
  tryPostSendMessage,
  postSendMessageSuccess,
  postSendMessageFailed,
  tryGetMessages,
  getMessagesSuccess,
  getMessagesFailure,
} from "../actions/request";
import {
  readNotification as readNotificationAction,
} from "../actions/notification"
import {
  getClient,
  postCreateRequest,
  postUpdateRequest,
  postAcceptRequest,
  postCancelRequest,
  postReadNotification,
  postSendMessage,
  getMessages,
} from "../../api/client";
import { getCreateRequestLoading } from "../selectors/request";
import { requestsMutex } from "../store";

import store from "../store";

export const getClientData = outerDispatch => ({isLoading=true, isForce=false} = {}) => {
  outerDispatch(dispatch => {
    requestsMutex.lockFunc = isLoading ? requestsMutex.rlock : requestsMutex.lock;
    requestsMutex.lockFunc().then(release => {
      if (isLoading) {
        dispatch(tryGetClient());
      }

      getClient(isForce)
        .then(res => {
          if (res.data === "NO CHANGE") return
          dispatch(getClientSuccess(res.data));
        })
        .catch(err => {
          dispatch(getClientFailure(err));
        })
        .finally(release);
    });
  })
}

export const createRequest = outerDispatch => request => {
  outerDispatch(dispatch => {
    if (getCreateRequestLoading(store.getState())) {
      return;
    }

    requestsMutex.rlock().then(release => {
      dispatch(tryCreateRequest());

      postCreateRequest(request)
        .then(res => {
          const { type, status, index } = res.data;
          dispatch(push(`/home/${type}/${status}?or=${index}`));
          dispatch(createRequestSuccess());
          getClientData(dispatch)();
        })
        .catch(err => {
          dispatch(createRequestFailure(err));
        })
        .finally(release);
    })
  })
}

export const updateRequest = outerDispatch => updatedRequest => {
  const { type, status, index } = updatedRequest;

  outerDispatch(dispatch => {
    requestsMutex.rlock().then(release => {
      dispatch(tryUpdateRequest());

      postUpdateRequest(updatedRequest)
        .then(res => {
          dispatch(updateRequestSuccess(res.data, updatedRequest._id));
          dispatch(push(`/home/${type}/${status}?or=${index}&em=false`));
        }).catch(err => {
          dispatch(updateRequestFailure(err));
        }).finally(release);
    });
  })
}

export const cancelRequest = outerDispatch => request => {
  outerDispatch(dispatch => {
    requestsMutex.rlock().then(release => {
      dispatch(tryCancelRequest(request));

      postCancelRequest(request._id)
        .then(res => {
          dispatch(canceleRequestSuccess(request));
        }).catch(err => {
          dispatch(canceleRequestFailure(request, err));
        }).finally(release);
    });
  })
}

export const readNotification = outerDispatch => notificationId => {
  outerDispatch(dispatch => {
    requestsMutex.rlock().then(release => {
      postReadNotification(notificationId)
        .then(res => {
          dispatch(readNotificationAction(notificationId));
        }).finally(release);
      })
    });
}

export const sendMessage = outerDispatch => (requestId, providerId, message) => {
  outerDispatch(dispatch => {
    requestsMutex.rlock().then(release => {
      dispatch(tryPostSendMessage(requestId));

      postSendMessage(requestId, providerId, message)
        .then(res => {
          dispatch(postSendMessageSuccess(requestId, providerId, res.data));
        })
        .catch(err => {
          dispatch(postSendMessageFailed(err));
        }).finally(release);
      });
  })
}

export const getMessagesData = outerDispatch => requestId => {
  outerDispatch(dispatch => {
    requestsMutex.rlock().then(release => {
      dispatch(tryGetMessages(requestId));

      getMessages(requestId)
        .then(res => {
          dispatch(getMessagesSuccess(res.data, requestId));
        })
        .catch(err => {
          dispatch(getMessagesFailure(err));
        }).finally(release);
    });
  })
}

export const deleteFile = outerDispatch => requestId => {
  outerDispatch(dispatch => {
    requestsMutex.rlock().then(release => {
      dispatch(tryGetMessages(requestId));

      getMessages(requestId)
        .then(res => {
          dispatch(getMessagesSuccess(res.data, requestId));
        })
        .catch(err => {
          dispatch(getMessagesFailure(err));
        }).finally(release);
    });
  })
}
