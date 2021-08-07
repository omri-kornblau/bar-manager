import React from "react"
import { Provider } from "react-redux"
import { ThemeProvider, StylesProvider, jssPreset} from "@material-ui/styles"
import { create } from 'jss'
import rtl from 'jss-rtl'

import store from "./redux/store"
import theme from "./theme"

import Main from "./views/Main"

const jss = create({ plugins: [...jssPreset().plugins, rtl()] })

const ApplyDirection = ({ children }) => theme.direction === "rtl" ? <StylesProvider jss={jss}> { children } </StylesProvider> : children

const App = () => {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ApplyDirection>
            <Main/>
          </ApplyDirection>
        </ThemeProvider>
      </Provider>
    )
}

export default App
