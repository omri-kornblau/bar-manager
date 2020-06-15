import React from "react";
import {
  Container,
  Button,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";

const AboutUs = props => {
  return (
    <Container>
      <Typography align="center" variant="h6">
        {props.viewLabel}
      </Typography>
    </Container>
  );
}

export default AboutUs;
