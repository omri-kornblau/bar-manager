import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  table: {
    borderRadius: theme.paper.borderRadius,
    "& tr:first-child td": {
      marginTop: "10px",
    },
  },
  tableHeader: {
    borderRadius: theme.paper.borderRadius,
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)"
  },
  tableRow: {
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
