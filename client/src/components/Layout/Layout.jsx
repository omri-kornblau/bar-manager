import React from "react"
import { 
  AppBar, 
  Box, 
  Container, 
  Toolbar, 
  Typography
} from "@material-ui/core"

import NavBar from "../NavBar"

import useStyle from "./style"

const Layout = (props) => {
  const {
    children
  } = props

  const classes = useStyle()

  return (
    <div className={classes.back}>
      <NavBar/>
      <main>
        <Container>
          <Toolbar/>
          {children}
        </Container>
      </main>
    </div>
  )
}

export default Layout
