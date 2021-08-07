import React from "react"
import { 
  AppBar, 
  Box, 
  Container, 
  Toolbar, 
  Typography
} from "@material-ui/core"

import useStyle from "./style"

const NavBar = () => {
  const classes = useStyle()

  return (
    <AppBar className={classes.navbar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          אפליקציה שלנו
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
