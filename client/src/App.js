import React from "react"
import { Provider } from "react-redux"
import { ThemeProvider, StylesProvider, jssPreset} from "@material-ui/styles"
import { create } from 'jss'
import rtl from 'jss-rtl'

import store from "./redux/store"
import theme from "./theme"

import Main from "./views/Main"

const jss = create({ plugins: [...jssPreset().plugins, rtl()] })

const App = () => {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <StylesProvider jss={jss}>
            <Main/>
          </StylesProvider>
        </ThemeProvider>
      </Provider>
    )
}

export default App
