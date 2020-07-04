import {
  tryPostFilteredRequests,
  postFilteredRequestsSuccess,
  postFilteredRequestsFailure,
  tryFetchRequest,
  fetchRequestSuccess,
  fetchRequestFailed,
} from "../actions/provider";
import {
  postFilteredRequests, getFetchRequest,
} from "../../api/provider";

export const filterRequests = outerDispatch => (type, filters) => {
  outerDispatch(dispatch => {
    dispatch(tryPostFilteredRequests());

    postFilteredRequests(type, filters)
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
