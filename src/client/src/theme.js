import { createMuiTheme } from "@material-ui/core";
import { purple, grey, common, green, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  direction: 'rtl',
  shape: {
    borderRadius: 10
  },
  palette: {
    primary: {
      main: purple[800]
    },
    success: {
      main: green[600],
      darker: green[800],
    },
    failed: {
      main: red[600],
      darker: red[800],
    },
    text: {
      primary: grey[800],
      white: {
        inActive: "rgba(255, 255, 255, 0.6)",
        active: common.white,
        hover: "rgba(255, 255, 255, 0.7)"
      }
    },
    background: {
      default: common.white,
      dark: grey[100],
    }
  },
  paper: {
    borderRadius: 10
  },
  typography: {
    fontFamily: [
      'Rubik light',
      '"Segoe UI light"',
      'Arial'
    ].join(','),
  },
});

export default theme;
