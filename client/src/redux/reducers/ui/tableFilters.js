import { UPDATE_TABLE_FILTER } from "../../actions/tableFilters";
const initialState = {};

const tableFiltersReducer = (state=initialState, action) => {
  switch(action.type) {
    case UPDATE_TABLE_FILTER:
      return {...state, [action.payload.tableId]: action.payload.tableFilters}
    default:
      return state;
  }
}

export default tableFiltersReducer;
