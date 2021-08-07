import { createMuiTheme } from "@material-ui/core";
import { blue, orange, grey, common, green, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  // direction: 'rtl',
  shape: {
    borderRadius: 10
  },
  palette: {
    primary: {
      main: orange[600]
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
      primary: grey[100],
      white: {
        inActive: "rgba(255, 255, 255, 0.6)",
        active: common.white,
        hover: "rgba(255, 255, 255, 0.7)"
      }
    },
    type: 'dark',
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
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
});

export default theme;
