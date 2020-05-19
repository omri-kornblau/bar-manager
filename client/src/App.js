import React, { Component } from "react";
import { Provider } from "react-redux";

import "./assets/scss/material-kit.scss";

import MainLayout from "./layouts/Main";

import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MainLayout/>
        </div>
      </Provider>
    );
  }
}

export default App;
