import React, { useRef, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
 } from "@material-ui/core";

import ColumnResizer from "./ColumnResizer";
import TableHeaderCell from "./TableHeaderCell";
import Row from "./Row";
import useStyles from "./style";

const propTypes = {
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  columns: PropTypes.arrayOf(PropTypes.objectOf({
    id: PropTypes.string,
    label: PropTypes.string,
  })),
  isFilter: PropTypes.bool,
  isCollapse: PropTypes.bool,
};

const defaultProps = {
  rows: [[]],
  columns: [],
  isFilter: false,
  isCollapse: false,
};

const CustomTable = props => {
  const { rows, columns, isFilter, isCollapse } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const headerRefs = columns.map(() => useRef(null));

  const onPageChange = (event, newPage) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.table}>
      <TableContainer className={classes.table}>
        <Table stickyHeader className={classes.tableBody} size="small">
          <TableHead>
            <TableRow className={classes.tableHeader}>
              {
                columns.map((column, index) => {
                  if (isFilter && column.filter.type === 'text') {
                    column.filter.data = Array.from(
                      new Set(rows.map(row => row[column.id]))
                    );
                  }

                  return (
                    <Fragment key={column.id}>
                      <TableHeaderCell
                        column={column}
                        isFilter={isFilter}
                      />
                      {
                        index + 1 < columns.length
                        ? <ColumnResizer style={{padding: "0.5px"}}/>
                        : <></>
                      }
                    </Fragment>
                  )
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row, index) => (
              <Row row={row} columns={columns} key={index} isCollapse={isCollapse} headerRefs={headerRefs}>
                text
              </Row>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10,25,100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onRowsPerPageChange}
        labelDisplayedRows={({from, to, count}) => `${from}-${to} מתוך ${count}`}
        labelRowsPerPage="שורות בכל עמוד:"
        />
    </Paper>
  );
}

CustomTable.propTypes = propTypes;
CustomTable.defaultProps = defaultProps;

export default CustomTable;
