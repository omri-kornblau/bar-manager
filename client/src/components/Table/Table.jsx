import _ from "lodash";
import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  Fragment
} from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
 } from "@material-ui/core";

import ColumnResizer from "./ColumnResizer";
import TableHeaderCell from "./TableHeaderCell";
import TablePaginationActions from "./PagnitionActions";
import Row from "./Row";
import useStyles from "./style";
import {
  SORT_OPTIONS,
} from "./consts";

const propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })),
  filter: PropTypes.bool,
  collapse: PropTypes.element,
  rounded: PropTypes.bool,
  pagination: PropTypes.bool,
  drag: PropTypes.bool,
};

const defaultProps = {
  rows: [[]],
  columns: [],
  filter: false,
  collapse: null,
  pagination: true,
  onRowClick: _.noop,
  drag: true,
  page: 0,
  rowsPerPage: 5,
  onPageChange: _.noop,
  onRowsPerPageChange: _.noop,
};

const initOptions = (columns, rows) => {
  return columns.reduce((pre, column) => {
    if (column.filter === false) {
      return {...pre, [column.id]: {isActive: false}};
    }

    switch (_.isNil(column.filter) ? "" : column.filter.type) {
      case "":
      case "text":
        const uniqeRows = _.uniq(rows.map(row => row[column.id]));
        const options = uniqeRows.reduce((prev, cur) => (
          {[cur]: true, ...prev}
        ), {});

        return {...pre, [column.id]: {options, search: "", isActive: false}};

      case "number":
        return {...pre, [column.id]: {min: "", max: "", isActive: false}};

      case "date":
        return {...pre, [column.id]: {min: "", max: "", isActive: false}};

      case "bool":
        return {...pre, [column.id]: {value: null, isActive: false}};

    }
  }, {})
}

const CustomTable = props => {
  const {
    rows,
    columns,
    filter,
    collapse,
    rounded,
    pagination,
    onRowClick,
    drag,
    sort,
    actions,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    totalRows,
    manualSkip,
  } = props;

  const classes = useStyles();

  const [_page, setPage] = useState(page);
  const [_rowsPerPage, setRowsPerPage] = useState(rowsPerPage);
  const [sortBy, setSortBy] = useState({id: "", direction: true});
  const [options, setOptions] = useState(filter ? initOptions(columns, rows) : []);

  useEffect(() => setOptions(initOptions(columns, rows)), [rows, columns])

  const finalRows = useMemo(() => {
    const filteredRows = filter ?
      rows.filter(row => {
          return columns.every(column => {
            const value = row[column.id];
            const currentOptions = options[column.id];
            if (column.filter === false) {
              return true;
            }

            if (_.isNil(value)) {
              return true;
            }

            switch (_.isNil(column.filter) ? "" : column.filter.type) {
              case "":
              case "text":
                return !!value
                  ? value.toString().includes(currentOptions.search)
                    && !!currentOptions.options[value]
                  : "";

              case "number":
                const { min, max } = currentOptions;
                return (min === "" || min < value) && (max === "" || max > value);

              case "bool":
                return  _.isNil(currentOptions.value) || currentOptions.value === value;
            }
          })
      })
      : rows;

    if (sort && sortBy.id !== "") {
      filteredRows.sort((a, b) => {
        const _a = a[sortBy.id]
        const _b = b[sortBy.id]
        if (_a > _b) {
          return sortBy.direction ? 1 : -1;
        } else if (_a < _b) {
          return sortBy.direction ? -1 : 1;
        } else {
          return 0
        }
      });
    }

    return pagination && !manualSkip ? filteredRows.slice(_page * _rowsPerPage, (_page + 1) * _rowsPerPage) : filteredRows;
  }, [options, filter, sort, sortBy, _rowsPerPage, _page, manualSkip]);

  const headerRefs = useRef(columns.map(React.createRef));

  const _onPageChange = (event, newPage) => {
    onPageChange(newPage);
    setPage(newPage);
  };

  const _onRowsPerPageChange = event => {
    onRowsPerPageChange(+event.target.value);
    setRowsPerPage(+event.target.value);
    _onPageChange(null, 0);
  };

  const renderLabelDisplayedRows = ({from, to, count}) => {
    return `${from}-${to} מתוך ${count}`;
  };

  return (
    <Paper elevation={3} className={classes.table}>
      <TableContainer className={`${classes.table} ${rounded ? classes.roundedTable : ""}`}>
        <Table stickyHeader={pagination} className={classes.tableBody} size="small">
          <TableHead>
            <TableRow className={classes.tableHeader}>
              {
                columns.map((column, index) => {
                  return (
                    <Fragment key={column.id}>
                      <TableHeaderCell
                        ref={headerRefs[index]}
                        column={column}
                        filter={filter}
                        options={options[column.id]}
                        setOptions={newOptions => setOptions({...options, [column.id]: newOptions})}
                        setSortBy={
                          column.sort === false || !sort
                          ? () => {}
                          : () => setSortBy(
                              sortBy.id === column.id ?
                              {...sortBy, direction: !sortBy.direction}
                              : {id: column.id, direction: true}
                            )
                        }
                        sortDirection={
                          sortBy.id === column.id && column.sort !== false
                          ? sortBy.direction ? SORT_OPTIONS.UP : SORT_OPTIONS.DOWN
                          : SORT_OPTIONS.NONE
                        }
                      />
                      {
                        index + 1 < columns.length && !!drag
                        ? <ColumnResizer style={{padding: "0.5px"}} header/>
                        : <></>
                      }
                    </Fragment>
                  )
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {finalRows.map((row, index) =>
              <Row
                row={row}
                columns={columns}
                key={index}
                collapse={collapse}
                headerRefs={headerRefs.current}
                rounded={rounded}
                onRowClick={onRowClick}
                actions={actions}
                drag={drag}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      { pagination ?
       <TablePagination
          rowsPerPageOptions={[3,5,10,25,100]}
          component="div"
          count={_.isNil(totalRows) ? rows.length : totalRows}
          rowsPerPage={_rowsPerPage}
          page={_page}
          onChangePage={_onPageChange}
          onChangeRowsPerPage={_onRowsPerPageChange}
          labelDisplayedRows={renderLabelDisplayedRows}
          labelRowsPerPage="שורות בכל עמוד:"
          ActionsComponent={props =>
            <TablePaginationActions
              {...props}
              onClear={() => setOptions(initOptions(columns, rows))}
              clear={filter}
              clearDisabled={_.every(options, value => !value.isActive)}
            />
          }
        />
        : <></>
      }
    </Paper>
  );
}

CustomTable.propTypes = propTypes;
CustomTable.defaultProps = defaultProps;

export default CustomTable;
