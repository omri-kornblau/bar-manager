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
} from "../actions/provider";
import {
  postFilteredRequests, getFetchRequest, postSetOffer, postSendMessage,
} from "../../api/provider";

export const filterRequests = outerDispatch => (type, filters, skip, limit) => {
  outerDispatch(dispatch => {
    dispatch(tryPostFilteredRequests());

    postFilteredRequests(type, filters, skip, limit)
      .then(res => {
        dispatch(postFilteredRequestsSuccess(res.data));
      })
      .catch(err => {
        dispatch(postFilteredRequestsFailure(err));
      })
  })
}

export const fetchRequest = outerDispatch => requestId => {
  outerDispatch(dispatch => {
    dispatch(tryFetchRequest());

    getFetchRequest(requestId)
      .then(res => {
        dispatch(fetchRequestSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchRequestFailed(err));
      })
  })
}

export const setOffer = outerDispatch => (requestId, price) => {
  outerDispatch(dispatch => {
    dispatch(tryPostSetOffer());

    postSetOffer(requestId, price)
      .then(res => {
        dispatch(postSetOfferSuccess(requestId, res.data));
      })
      .catch(err => {
        dispatch(postSetOfferFailed(err));
      })
  })
}

export const sendMessage = outerDispatch => (requestId, message) => {
  outerDispatch(dispatch => {
    dispatch(tryPostSendMessage(requestId));

    postSendMessage(requestId, message)
      .then(res => {
        dispatch(postSendMessageSuccess(requestId, res.data));
      })
      .catch(err => {
        dispatch(postSendMessageFailed(err));
      })
  })
}
