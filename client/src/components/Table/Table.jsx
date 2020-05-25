// import _ from "lodash";
import React, { useState, Fragment } from "react";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Typography } from "@material-ui/core";
import ColumnResizer from "./ColumnResizer";

import CostumeMenu from './TableHeaderCell'

function Row(props) {
  const { row, columns } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
        {columns.map(column => {
          const value = row[column.id];
          return (
            <Fragment key={column.id}>
              <TableCell align="right">
                { value }
              </TableCell>
              <ColumnResizer style={{padding: '0.5px'}}/>
            </Fragment>
          )
        })}
        <TableCell align="left">
          <IconButton size="small" onClick={() => setOpen(!open)}>
            { open
            ? <KeyboardArrowUpIcon/>
            : <KeyboardArrowDownIcon/> }
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length * 2 + 1}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Title
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const CostumeTable = props => {
  const { rows, columns } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {
                columns.map(column => {
                  if (column.filter.type === 'text') {
                    column.filter.data = Array.from(new Set(rows.map(row => row[column.id])));
                  }

                  return (
                    <Fragment key={column.id}>
                      <CostumeMenu
                        label={column.label}
                        filterType={column.filter.type}
                        filterData={column.filter.data}
                        />
                      <ColumnResizer style={{padding: '0.5px'}}/>
                    </Fragment>
                  )
                })
              }
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row, index) => (
              <Row row={row} columns={columns} key={index}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10,25,100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </Paper>
  );
}

export default CostumeTable;
