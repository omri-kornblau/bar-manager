import React from "react" 
import { 
  Button,
  Grid
} from "@material-ui/core"

import GradButton from "../../components/GradButton"

import { useTranslation } from "react-i18next"

const Login = (props) => {
  const { t } = useTranslation()

  return (
    <Grid>
      <GradButton>
        {t("Login.GetCodeButton")}
      </GradButton>
    </Grid>
  ) 
}

export default Login 
