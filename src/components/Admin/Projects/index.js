import React, { useEffect, useState, useCallback } from 'react';
import {
  Paper,
  TextField,
  InputAdornment,
  Tooltip,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import { Row, Col } from 'react-bootstrap';
import SVG from 'react-inlinesvg';
import IconBox from 'components/IconBox';
import { useStyles } from 'styles/admin';
import {
  ADMIN_PROJECTS_DEFAULT_PAGE,
  ADMIN_PROJECTS_TABLE_HEADER,
  ADMIN_PROJECTS_PER_PAGE,
  DATATABLE_TYPE,
  SORTING_DIRECTION,
} from 'constants/admin';
import { getAdminProjectsRequest, setAdminProjectsPage } from 'redux/actions/admin';
import DataTable from '../DataTable';

export default function Projects() {
  const dashboard = useSelector(({ admin }) => admin.dashboard);
  const [searchTerm, setSearchTerm] = useState(null);
  const [currentPage, setCurrentPage] = useState(ADMIN_PROJECTS_DEFAULT_PAGE);
  const [filterColsMenuAnchorEl, setFilterColsMenuAnchorEl] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tableCols, setTableCols] = useState(() => Object.values(ADMIN_PROJECTS_TABLE_HEADER).reduce((obj, heading) => {
    obj[heading.value] = {
      label: heading.label,
      value: heading.value,
      checked: true,
      sortable: heading.sortable,
      sortOn: heading.sortOn,
    };
    return obj;
  }, {}));
  const [order, setOrder] = useState(SORTING_DIRECTION.asc);
  const [orderBy, setOrderBy] = useState('');

  const handleSearchChange = useCallback(({ target: { value } }) => {
    setSearchTerm(value);
    setCurrentPage(ADMIN_PROJECTS_DEFAULT_PAGE);
  }, []);

  useEffect(() => {
    dispatch(getAdminProjectsRequest({
      page: currentPage,
      perPage: dashboard.perPage || ADMIN_PROJECTS_PER_PAGE,
      orderBy,
      order,
      searchTerm,
    }));
  }, []);

  useEffect(() => {
    dispatch(getAdminProjectsRequest({
      page: currentPage,
      perPage: dashboard.perPage || ADMIN_PROJECTS_PER_PAGE,
      orderBy,
      order,
      searchTerm,
    }));
  }, [searchTerm, order, orderBy]);

  useEffect(() => {
    setCurrentPage(dashboard.current_page);
  }, [dashboard.current_page]);

  const handlePageChange = useCallback((nextPage) => {
    if (!nextPage) return;

    if (nextPage > dashboard.total_pages) return;

    dispatch(setAdminProjectsPage(nextPage));

    dispatch(getAdminProjectsRequest({
      page: nextPage,
      perPage: dashboard.perPage,
      orderBy,
      order,
      searchTerm,
    }));
  });

  const handlePerPageChange = ({ target: { value } }) => {
    dispatch(getAdminProjectsRequest({
      page: ADMIN_PROJECTS_DEFAULT_PAGE,
      perPage: value,
      orderBy,
      order,
      searchTerm,
    }));
  };

  const handleTableColsToggle = useCallback((value) => {
    const tmpTableCols = { ...tableCols };
    const tmpCol = Object.values(tmpTableCols).find((col) => col.value === value);

    if (tmpCol === undefined) return;

    tmpCol.checked = !tmpCol.checked;

    setTableCols(tmpTableCols);
  }, [tableCols]);

  const handleSortChange = useCallback((value) => {
    const isAsc = orderBy === value && order === SORTING_DIRECTION.asc;
    setOrder(isAsc ? SORTING_DIRECTION.desc : SORTING_DIRECTION.asc);
    setOrderBy(value);
  }, [order, orderBy]);

  return (
    <Paper className='p-4'>
      <Row className='justify-content-between' noGutters>
        <Col className='d-flex align-items-center'>
          <h3 className='mr-4'>Administrator View</h3>
        </Col>
        <Col className='d-flex justify-content-end'>
          <TextField
            name='search-glossary'
            placeholder='Search'
            variant='outlined'
            value={searchTerm}
            onChange={handleSearchChange}
            size='small'
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment className={classes.searchIcon}>
                  <SearchIcon className='mr-4' />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <Tooltip className='ml-4 ' title='Show/Hide columns' arrow>
            <span>
              <IconBox
                variant='dark'
                className='mr-4 show-hide-cols'
                onClick={(e) => setFilterColsMenuAnchorEl(e.currentTarget)}
              >
                <SVG src='/media/svg/icons/General/Visible.svg' />
              </IconBox>
            </span>
          </Tooltip>
        </Col>
      </Row>
      <Menu
        anchorEl={filterColsMenuAnchorEl}
        getContentAnchorEl={null}
        keepMounted
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{ style: { maxHeight: 48 * 4.5 } }}
        open={Boolean(filterColsMenuAnchorEl)}
        onClose={() => setFilterColsMenuAnchorEl(null)}
      >
        {
          Object.values(ADMIN_PROJECTS_TABLE_HEADER).map((attr) => (
            <MenuItem key={`${attr.value}`}>
              <FormControlLabel
                control={(
                  <Checkbox
                    name={`${attr.value}`}
                    checked={tableCols[attr.value].checked}
                    onChange={handleTableColsToggle.bind(this, attr.value)}
                  />
                )}
                label={attr.label}
                className='w-100'
              />
            </MenuItem>
          ))
        }
      </Menu>
      <Row className='px-6'>
        <DataTable
          headings={tableCols}
          data={dashboard.projects}
          totalRows={dashboard.total_records}
          page={currentPage}
          totalPages={dashboard.total_pages}
          perPage={dashboard.perPage}
          handlePerPageChange={handlePerPageChange}
          handlePageChange={handlePageChange}
          dataTableType={DATATABLE_TYPE.admin}
          orderBy={orderBy}
          order={order}
          handleSortChange={handleSortChange}
        />
      </Row>
    </Paper>
  );
}
