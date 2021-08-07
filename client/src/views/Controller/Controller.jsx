import React, { useEffect, useState } from "react"
import {
  Grid,
  TextField,
  Paper,
  Box
} from "@material-ui/core"
import Axios from "axios"

import GradButton from "../../components/GradButton"

import { getButtons, postAddButton, postClearButtons } from "../../api/button"

const Controller = (props) => {
  const [buttonsReq, setButtonsReq] = useState({
    buttons: null,
    error: null
  })

  const [newButtonData, setNewButtonData] = useState({
    name: "",
    url: "",
    method: ""
  })

  const _addButton = async (e) => {
    e.preventDefault()

    setButtonsReq((current) => ({
      ...current,
      buttons: !!current.buttons ?  [ ...current.buttons, newButtonData ] : [ newButtonData ]
    }))

    try {
      await postAddButton(newButtonData)
    } catch (error) {
      setButtonsReq((current) => ({
        ...current,
        buttons: !!current.buttons ? current.buttons.slice(0, -1) : null
      }))
    }
  }

  const _clearAllButtons = async () => {
    setButtonsReq((current) => ({
      ...current,
      buttons: null
    }))

    try {
      await postClearButtons()
    } catch (error) {
      setButtonsReq(buttonsReq)
    }

  }

  const _onFormChange = (e) => {
    const { name, value } = e.target

    setNewButtonData((current) => ({
      ...current,
      [name]: value
    }))
  }

  const _buildButtonReq = (buttonData) => async () => {
    await Axios[buttonData.method](buttonData.url)
  }

  useEffect(async () => {
    try {
      const buttons = await getButtons()
      setButtonsReq({
        buttons,
        error: null
      })
    } catch (error) {
      setButtonsReq({ error })
    }
  }, [setButtonsReq])

  const buttons = buttonsReq?.buttons

  return (
    <Grid container justify="center">
      <Grid item container justify="center">
        <Grid md={4} xs={11} item>
          <Box pt={3}/>
          <Paper elevation={2}>
            <Box p={4} pt={1}>
              <form onSubmit={_addButton} noValidate autoComplete="off">
                <Grid direction="column" container alignContent="center" justify="center">
                  <TextField onChange={_onFormChange} fullWidth name="name" label="Name" />
                  <TextField onChange={_onFormChange} fullWidth name="method" label="Method" />
                  <TextField onChange={_onFormChange} fullWidth name="url" label="URL" />
                  <Box pt={2}/>
                  <GradButton color="secondary" type="submit">
                    Add
                  </GradButton>
                  <Box pt={2}/>
                  <GradButton color="secondary" onClick={_clearAllButtons}>
                    Clear All
                  </GradButton>
                </Grid>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid continer item>
        <Box pt={3}/>
        { !!buttons && buttons.map((button) =>
            <GradButton onClick={_buildButtonReq(button)}>
              {button.name}
            </GradButton>
        ) }
      </Grid>
    </Grid>
  )
}

export default Controller
