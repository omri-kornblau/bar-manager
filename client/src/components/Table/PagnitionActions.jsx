import React from "react";
import {
  useTheme,
  Grid,
  Button,
} from "@material-ui/core";

import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const TablePaginationActions = props => {
  const theme = useTheme();
  const {
    count,
    page,
    rowsPerPage,
    onChangePage,
    clearDisabled,
    onClear,
    clear,
  } = props;

  const handleBackButtonClick = e => {
    onChangePage(e, page - 1);
  };

  const handleNextButtonClick = e => {
    onChangePage(e, page + 1);
  };

  return (
    <Grid container>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      {
        clear ?
        <Button
          onClick={onClear}
          disabled={clearDisabled}
          aria-label="next page"
        >
            נקה סינונים
        </Button>
        : <></>
      }
    </Grid>
  );
}

export default TablePaginationActions;
