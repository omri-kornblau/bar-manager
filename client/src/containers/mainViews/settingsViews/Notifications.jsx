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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              סוג אירוע
            </TableCell>
            <TableCell>
              קבלה למייל
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              אירוע כלשהו
            </TableCell>
            <TableCell>
              <input type="checkbox"/>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
}

export default AboutUs;
