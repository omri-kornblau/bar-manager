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
              הפלטפורה לניירות ערך מסחריים
            </Box>
          </Typography>
          <Typography className={classes.whiteText} variant="h4" align="center">
            מבית גיזה זינגר אבן
          </Typography>
          <Box mt={5}/>
          <Container maxWidth="sm">
            <Typography className={classes.whiteText} paragraph variant="body1" align="center">
              פלטפורמה מקוונת המהווה נקודת מפגש לחברות ציבוריות ופרטיות איתנות, מדורגות ושאינן מדורגות, המעוניינות בהלוואות או אשראי לזמן קצר ובינוני, לבין משקיעים מוסדיים, בנקים, קרנות נאמנות ומשקיעים כשירים המעוניינים לגוון את מנעד השקעותיהם.
            </Typography>
            <Typography className={classes.whiteText} paragraph variant="body1" align="center">
              בלב פעילות הפלטפורמה מערכת מאובטחת, שקופה ומהירה אשר מאפשרת למשקיעים לנהל הליך התמחרות אודות שיעור הריבית ו/או עמלת הקצאת מסגרת אשראי, אשר תוצע לחברות הלוות.
            </Typography>
            <Typography className={classes.whiteText} paragraph variant="body1" align="center">
              הפלטפורמה תמקסם ערך לחברות ולמשקיעים, הודות לחסכון זמן רב, הוזלת עלויות עסקאות במתכונתן הנוכחית, חשיפה למגוון משקיעים רחב והנגשה קלה בין הצדדים.
            </Typography>
            <Box mt={6}/>
            <Grid container justify="space-evenly" direction="row">
                <Grid container justify="center" xs>
                  <Link to="/home/login">
                    <Button size="large" color="primary" variant="contained">
                      התחבר כמבטח
                    </Button>
                  </Link>
                </Grid>
                <Grid container justify="center" xs>
                  <Link to="/home/login">
                    <Button size="large" color="primary" variant="contained">
                      התחבר כלקוח
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
