import React, { Component } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";

import "./assets/scss/material-kit.scss";

import MainLayout from "./layouts/Main";

import store from "./store";
import theme from "./theme";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MainLayout/>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
