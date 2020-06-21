import {
  getClient as getClientAction,
  getClientFinish as getClientFinishAction,
} from "../actions/main";
import {
  getClient as getClientApi,
} from "../../api/client"

export const getClientData = outerDispatch => () => {
  outerDispatch(dispatch => {
    dispatch(getClientAction);

    getClientApi()
      .then(res => {
        dispatch(getClientFinishAction(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  })
}
