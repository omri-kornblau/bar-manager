export const getTableHeaders = (headers, actions, structure) => {
  return [...headers.map(column => structure[column]), ...(actions ? [structure.actions] : [])]
}
