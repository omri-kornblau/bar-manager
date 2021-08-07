import React from "react"
import {
  Button
} from "@material-ui/core"

import useStyle from "./style"

const GradButton = (props) => {
  const classes = useStyle()

  return (
    <Button
      className={classes.gradientButton}
      variant="contained"
      {...props}
    />
  )
}

export default GradButton
