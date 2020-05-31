import { createMuiTheme } from "@material-ui/core";
import { purple, grey, common } from '@material-ui/core/colors';

const theme = createMuiTheme({
  direction: 'rtl',
  shape: {
    borderRadius: 10
  },
  palette: {
    primary: {
      main: purple[800]
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
