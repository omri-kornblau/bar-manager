import { combineReducers } from "redux";

import tableFiltersReducer  from "./tableFilters";

export default combineReducers({
  tableFilters: tableFiltersReducer,
});
