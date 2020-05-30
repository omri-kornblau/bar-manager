import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  table: {
    borderRadius: theme.paper.borderRadius,
  },
  roundedTable: {
    "& tr:first-child td": {
      marginTop: "10px",
    },
  },
  tableHeader: {
    borderRadius: theme.paper.borderRadius,
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)"
  },
  input: {
    height: 0,
    fontSize: "0.8rem"
  },
  underline: {
    paddingBottom: 5,
  },
  checkbox: {
    padding: "0px",
  },
  itemText: {
    fontSize: "10px"
  },
  menuItem: {
    color: 'black',
    minWidth: '150px',
  },
  menuPaper: {
    border: '1px solid #d3d4d5',
  },
  roundedTableRow: {
    "& td": {
      backgroundColor: theme.palette.background.dark,
      marginBottom: "5px",
      marginTop: "5px",
    },
    "& td:first-child": {
      borderTopLeftRadius: "50vh",
      borderBottomLeftRadius: "50vh",
      marginLeft: "5px",
    },
    "& td:last-child": {
      borderTopRightRadius: "50vh",
      borderBottomRightRadius: "50vh",
      marginRight: "5px",
    },
  },
  tabelCell: {
    display: "block",
    whiteSpace: "nowrap",
    textOverflow: "clip",
  }
}))
