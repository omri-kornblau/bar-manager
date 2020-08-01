import {
  tryPostFilteredRequests,
  postFilteredRequestsSuccess,
  postFilteredRequestsFailure,
  tryFetchRequest,
  fetchRequestSuccess,
  fetchRequestFailed,
  tryPostSetOffer,
  postSetOfferSuccess,
  tryPostSendMessage,
  postSendMessageSuccess,
  postSendMessageFailed,
  postSetOfferFailed,
  tryGetProvider,
  getProviderSuccess,
  getProviderFailed,
} from "../actions/provider";
import {
  readNotification as readNotificationAction,
} from "../actions/notification";
import {
  getProvider,
  postFilteredRequests,
  getFetchRequest,
  postSetOffer,
  postSendMessage,
  postReadNotification,
} from "../../api/provider";

import { requestsMutex } from "../store";

export const getProviderData = outerDispatch => (isLoading=true) => {
  outerDispatch(dispatch => {
    requestsMutex.lockFunc = isLoading ? requestsMutex.rlock : requestsMutex.lock;
    requestsMutex.lockFunc().then(release => {
      if (isLoading) {
        dispatch(tryGetProvider());
      }

      getProvider()
        .then(res => {
          dispatch(getProviderSuccess(res.data));
        })
        .catch(err => {
          dispatch(getProviderFailed(err));
        })
        .finally(release);
    });
  })
}

export const filterRequests = outerDispatch => (type, filters, skip, limit, isLoading=true) => {
  outerDispatch(dispatch => {
    requestsMutex.lockFunc = isLoading ? requestsMutex.rlock : requestsMutex.lock;
    requestsMutex.lockFunc().then(release => {
      if (isLoading) {
        dispatch(tryPostFilteredRequests());
      }

      postFilteredRequests(type, filters, skip, limit)
        .then(res => {
          dispatch(postFilteredRequestsSuccess(res.data));
        })
        .catch(err => {
          dispatch(postFilteredRequestsFailure(err));
        })
        .finally(release);
    });
  })
}

export const fetchRequest = outerDispatch => ({requestId, isLoading=true, isForce=false} = {}) => {
  outerDispatch(dispatch => {
    requestsMutex.lockFunc = isLoading ? requestsMutex.rlock : requestsMutex.lock;
    requestsMutex.lockFunc().then(release => {
      if (isLoading) {
        dispatch(tryFetchRequest());
      }

      getFetchRequest(requestId, isForce)
        .then(res => {
          dispatch(fetchRequestSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchRequestFailed(err));
        })
        .finally(release);
    });
  })
}

export const setOffer = outerDispatch => (requestId, price) => {
  outerDispatch(dispatch => {
    requestsMutex.rlock().then(release => {
      dispatch(tryPostSetOffer());

      postSetOffer(requestId, price)
        .then(res => {
          dispatch(postSetOfferSuccess(requestId, res.data));
        })
        .catch(err => {
          dispatch(postSetOfferFailed(err));
        })
        .finally(release);
    })
  })
}

export const sendMessage = outerDispatch => (requestId, message) => {
  outerDispatch(dispatch => {
    requestsMutex.rlock().then(release => {
      dispatch(tryPostSendMessage(requestId));

      postSendMessage(requestId, message)
        .then(res => {
          dispatch(postSendMessageSuccess(requestId, res.data));
        })
        .catch(err => {
          dispatch(postSendMessageFailed(err));
        })
        .finally(release);
    });
  })
}

export const readNotification = outerDispatch => notificationId => {
  outerDispatch(dispatch => {
    requestsMutex.rlock().then(release => {
    postReadNotification(notificationId)
      .then(res => {
        dispatch(readNotificationAction(notificationId));
      })
      .finally(release);
    });
  })
}
