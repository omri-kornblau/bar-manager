import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider, StylesProvider, jssPreset} from "@material-ui/styles";
import { create } from 'jss';
import rtl from 'jss-rtl';

import "./assets/scss/material-kit.scss";

import store, { history }from "./redux/store";
import theme from "./theme";

import Main from "./containers/layouts/Main";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const App = () => {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <StylesProvider jss={jss}>
              <Main/>
            </StylesProvider>
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
}

export default App;
