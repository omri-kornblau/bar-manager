import {
  tryPostFilteredRequests,
  postFilteredRequestsSuccess,
  postFilteredRequestsFailure,
} from "../actions/provider";
import { postFilteredRequests } from "../../api/provider";

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
