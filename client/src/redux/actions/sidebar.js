export const SET_SIDEBAR = "SET_SIDEBAR";

export const SET_SIDEBAR_CLOSED = "SET_SIDEBAR_CLOSED";

export const setSidebar = view => ({
  type: SET_SIDEBAR,
  payload: { view },
  query: {}
});

export const setSidebarClosed = dispatch => closed => dispatch({
  type: SET_SIDEBAR_CLOSED,
  payload: { closed }
});
