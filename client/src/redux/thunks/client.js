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
} from "../actions/request";
import {
  getClient,
  postCreateRequest,
  postUpdateRequest,
} from "../../api/client"
import { getCreateRequestLoading } from "../selectors/request";

import store from "../store";

export const getClientData = outerDispatch => () => {
  outerDispatch(dispatch => {
    dispatch(tryGetClient());

    getClient()
      .then(res => {
        dispatch(getClientSuccess(res.data));
      })
      .catch(err => {
        dispatch(getClientFailure(err.response));
      })
  })
}

export const createRequest = outerDispatch => request => {
  outerDispatch(dispatch => {
    if (getCreateRequestLoading(store.getState())) {
      return;
    }

    dispatch(tryCreateRequest());

    postCreateRequest(request)
      .then(res => {
        const { type, status, index } = res.data;
        dispatch(push(`/home/${type}/${status}?or=${index}`));
        dispatch(createRequestSuccess());
        getClientData(dispatch)();
      })
      .catch(err => {
        dispatch(createRequestFailure(err.response));
      })
  })
}

export const updateRequest = outerDispatch => updatedRequest => {
  const { type, status, index } = updatedRequest;

  outerDispatch(dispatch => {
    dispatch(tryUpdateRequest());

    postUpdateRequest(updatedRequest)
      .then(res => {
        dispatch(updateRequestSuccess());
        getClientData(dispatch)();
        dispatch(push(`/home/${type}/${status}?or=${index}&em=false`));
      }).catch(err => {
        dispatch(updateRequestFailure(err.response));
      })
  })
}
