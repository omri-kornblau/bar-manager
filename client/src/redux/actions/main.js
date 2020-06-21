
export const GET_CLIENT = "GET_CLIENT";
export const GET_CLIENT_FINISH = "GET_CLIENT_FINISH";

export const getClient = ({
  type: GET_CLIENT,
});

export const getClientFinish = client => ({
  type: GET_CLIENT_FINISH,
  payload: client,
});
