import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { ConnectedRouter } from 'connected-react-router'

import "./assets/scss/material-kit.scss";

import store, { history }from "./redux/store";
import theme from "./theme";

import Main from "./containers/layouts/Main";

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <Main/>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
