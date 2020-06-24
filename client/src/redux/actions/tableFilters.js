export const UPDATE_TABLE_FILTER = "UPDATE_TABLE_FILTER";

export const updateTableFilters = (tableId, tableFilters) => ({
  type: UPDATE_TABLE_FILTER,
  payload: {tableId, tableFilters},
});
