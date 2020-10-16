import React from "react";
import {
  Container,
  Box,
  Typography,
  Toolbar,
  Grid,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyle from "./style";

const Welcome = props => {
  const classes = useStyle();

  return (
    <>
      <Box height="100vh" className={classes.cityBackground}>
        <Toolbar/>
        <Container className={classes.container} maxWidth="xl">
          <Typography className={classes.whiteText} variant="h3" align="center">
            <Box fontWeight={800}>
              הפלטפורמה לביטוחים
            </Box>
          </Typography>
          <Typography className={classes.whiteText} variant="h4" align="center">
            מבית גיזה זינגר אבן
          </Typography>
          <Box mt={5}/>
          <Container maxWidth="sm">
            <Typography className={classes.whiteText} paragraph variant="body1" align="center">
              פלטפורמה מקוונת לרכישת פוליסות ביטוח לנכסים שונים.
            </Typography>
            <Typography className={classes.whiteText} paragraph variant="body1" align="center">
              הפלטפורמה מהווה נקודת מפגש בין חברות ציבורית/פרטיות/ממשלתיות, רשויות מקומיות, ותאגידים אחרים לבין חברות ביטוח מובילות בישראל.
            </Typography>
            <Typography className={classes.whiteText} paragraph variant="body1" align="center">
              בלב פעילות הפלטפורמה מערכת מאובטחת, שקופה ומהירה המאפשרת לחברות הביטוח לנהל הליך התמחרות אחר גובה פרמיית הביטוח המבוקשת מהמבוטחים.
            </Typography>
            <Typography className={classes.whiteText} paragraph variant="body1" align="center">
              הפלטפורמה תסייע למבוטחים ולמבטחים בהפקת פוליסות ביטוח, הודות לחסכון זמן רב, הוזלה ניכרת של עלויות, חשיפה למגוון מבטחים רחב והנגשה קלה בין הצדדים.
            </Typography>
            <Box mt={6}/>
            <Grid container justify="space-evenly" direction="row">
                <Grid container item justify="center" xs>
                  <Link to="/home/login">
                    <Button size="large" color="primary" variant="contained">
                      התחברות מבטחים
                    </Button>
                  </Link>
                </Grid>
                <Grid container item justify="center" xs>
                  <Link to="/home/login">
                    <Button size="large" color="primary" variant="contained">
                      התחברות מבוטחים
                    </Button>
                  </Link>
                </Grid>
            </Grid>
          </Container>
        </Container>
      </Box>
    </>
  );
}

export default Welcome;
