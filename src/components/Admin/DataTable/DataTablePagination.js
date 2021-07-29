import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { MenuItem } from '@material-ui/core';
import SVG from 'react-inlinesvg';
import CustomTextField from 'components/CustomTextField';
import { useStyles } from 'styles/projectDetails';

function TablePagination({
  page,
  totalRows,
  totalPages,
  perPage,
  perPageOptions,
  onPageChange,
  onPerPageChange,
}) {
  const classes = useStyles();

  const getFirstPageNumber = () => {
    if (totalRows === 0) return 0;
    if (page === 1) return 1;
    return page * perPage - perPage + 1;
  }

  return (
    <Row className='w-100 mt-4 justify-content-between' noGutters>
      <Col className='d-flex align-items-center'>
        <CustomTextField
          name='per_page'
          value={perPage}
          onChange={onPerPageChange}
          variant='outlined'
          inputProps={{ className: classes.perPageInput }}
          select
        >
          {Object.values(perPageOptions).map((option) => (
            <MenuItem key={option} value={option}>
              { option }
            </MenuItem>
          ))}
        </CustomTextField>
        <small className='ml-4 text-muted'>
          {`Showing results from
            ${getFirstPageNumber()} to
            ${page * perPage < totalRows ? page * perPage : totalRows} of ${totalRows}
          `}
        </small>
      </Col>
      <Col className='d-flex justify-content-end align-items-center'>
        <div
          className={`mr-3 first-page ${classes.paginationControl}`}
          onClick={onPageChange.bind(this, 1)}
          role='presentation'
        >
          <SVG src='/media/svg/icons/Navigation/double-arrow-previous.svg' />
        </div>
        <div
          className={`mr-3 prev-page ${classes.paginationControl}`}
          onClick={onPageChange.bind(this, page - 1)}
          role='presentation'
        >
          <SVG src='/media/svg/icons/Navigation/arrow-previous.svg' />
        </div>
        <div className={`mr-3 current-page ${classes.paginationControl} ${classes.paginationCurrentPage}`}>
          { page }
        </div>
        <div
          className={`mr-3 next-page ${classes.paginationControl}`}
          onClick={onPageChange.bind(this, page + 1)}
          role='presentation'
        >
          <SVG src='/media/svg/icons/Navigation/arrow-next.svg' />
        </div>
        <div
          className={`last-page ${classes.paginationControl}`}
          onClick={onPageChange.bind(this, totalPages)}
          role='presentation'
        >
          <SVG src='/media/svg/icons/Navigation/double-arrow-next.svg' />
        </div>
      </Col>
    </Row>
  );
}

TablePagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalRows: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  perPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
};

export default memo(TablePagination);
