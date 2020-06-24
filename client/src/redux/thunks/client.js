import { push } from "connected-react-router";
import {
  getClient as getClientAction,
  getClientFinish as getClientFinishAction,
  sendingNewRequest,
} from "../actions/main";
import {
  getClient as getClientApi,
  newRequest as newRequestApi,
} from "../../api/client"

export const getClientData = outerDispatch => () => {
  outerDispatch(dispatch => {
    dispatch(getClientAction);

    getClientApi()
      .then(res => {
        dispatch(getClientFinishAction(res.data))
      })
      .catch(err => {
        console.error(err)
      })
  })
}

export const newRequest = outerDispatch => (request, insurenseType) => {
  outerDispatch(dispatch => {
    dispatch(sendingNewRequest);

    newRequestApi(request)
      .then(res => {
        dispatch(push(`/home/${insurenseType}/inProgress`));
      })
      .catch(err => {
        console.error(err)
      })
  })
}
