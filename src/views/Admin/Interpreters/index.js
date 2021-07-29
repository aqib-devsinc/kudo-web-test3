import React, { useEffect, useState, useCallback, useRef } from 'react';
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
import { useSubheader } from '_metronic/layout';
import urls from 'constants/urls';
import SearchIcon from '@material-ui/icons/Search';
import { Row, Col } from 'react-bootstrap';
import SVG from 'react-inlinesvg';
import IconBox from 'components/IconBox';
import { useStyles } from 'styles/admin';
import {
  ADMIN_INTERPRETER_PER_PAGE,
  ADMIN_INTERPRETER_DEFAULT_PAGE,
  ADMIN_INTERPRETER_TABLE_HEADER,
  DATATABLE_TYPE,
  SORTING_DIRECTION,
} from 'constants/admin';
import { Redirect } from 'react-router-dom';
import { getAdminInterpretersRequest, setAdminInterpretersPage } from 'redux/actions/admin';
import { ROLES } from 'constants/roles';
import DataTable from 'components/Admin/DataTable';

export default function Interpreters() {
  const { isAdmin } = useSelector(({ auth }) => ({ isAdmin: auth.user?.roles?.includes(ROLES.admin) }));
  const interpreters = useSelector(({ admin }) => admin.interpreters);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(ADMIN_INTERPRETER_DEFAULT_PAGE);
  const [filterColsMenuAnchorEl, setFilterColsMenuAnchorEl] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tableCols, setTableCols] = useState(() => (
    Object.values(ADMIN_INTERPRETER_TABLE_HEADER).reduce((obj, heading) => {
      obj[heading.value] = {
        label: heading.label,
        value: heading.value,
        checked: true,
        sortable: heading.sortable,
        sortOn: heading.sortOn,
      };
      return obj;
    }, {})
  ));
  const [order, setOrder] = useState(SORTING_DIRECTION.asc);
  const [orderBy, setOrderBy] = useState('');

  const breadcrumbsRef = useRef();
  const subHeader = useSubheader();

  breadcrumbsRef.current = [
    {
      title: 'Admin',
      pathname: urls.admin,
    },
    {
      title: 'Interpretaters',
      pathname: urls.interpreters,
    },
  ];

  useEffect(() => {
    subHeader.setBreadcrumbs(breadcrumbsRef.current);
  }, []);

  useEffect(() => {
    if (!isAdmin) return <Redirect to={urls.home} />
  }, [isAdmin])

  useEffect(() => {
    dispatch(getAdminInterpretersRequest({
      page: currentPage,
      perPage: interpreters.perPage || ADMIN_INTERPRETER_PER_PAGE,
      orderBy,
      order,
      searchTerm,
    }));
  }, []);

  useEffect(() => {
    setCurrentPage(interpreters.current_page);
  }, [interpreters.current_page]);

  useEffect(() => {
    dispatch(getAdminInterpretersRequest({
      page: currentPage,
      perPage: interpreters.perPage || ADMIN_INTERPRETER_PER_PAGE,
      orderBy,
      order,
      searchTerm,
    }));
  }, [searchTerm, orderBy, order]);

  const handleSearchChange = useCallback(({ target: { value } }) => {
    setSearchTerm(value);
    setCurrentPage(ADMIN_INTERPRETER_DEFAULT_PAGE);
  }, []);

  const handlePageChange = useCallback((nextPage) => {
    if (!nextPage) return;

    if (nextPage > interpreters.total_pages) return;

    dispatch(setAdminInterpretersPage(nextPage));

    dispatch(getAdminInterpretersRequest({
      page: nextPage,
      perPage: interpreters.perPage,
      orderBy,
      order,
      searchTerm,
    }));
  });

  const handlePerPageChange = useCallback(({ target: { value } }) => {
    dispatch(getAdminInterpretersRequest({
      page: ADMIN_INTERPRETER_DEFAULT_PAGE,
      perPage: value,
      orderBy,
      order,
      searchTerm,
    }));
  });

  const handleTableColsChange = useCallback((value) => {
    const tmpTableCols = { ...tableCols };
    const tmpCol = Object.values(tmpTableCols).find((col) => col.value === value);
    tmpCol.checked = !tmpCol.checked;

    setTableCols(tmpTableCols);
  });

  const handleSortChange = useCallback((value) => {
    const isAsc = orderBy === value && order === SORTING_DIRECTION.asc;
    setOrder(isAsc ? SORTING_DIRECTION.desc : SORTING_DIRECTION.asc);
    setOrderBy(value);
  }, [order, orderBy]);

  return (
    <div className='container px-0 pt-5'>
      <Paper className='p-4'>
        <Row className='justify-content-between' noGutters>
          <Col className='d-flex align-items-center'>
            <h3 className='mr-4'>Interpreters</h3>
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
            Object.values(ADMIN_INTERPRETER_TABLE_HEADER).map((attr) => (
              <MenuItem key={`${attr.value}`}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      name={`${attr.value}`}
                      checked={tableCols[attr.value].checked}
                      onChange={handleTableColsChange.bind(this, attr.value)}
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
            data={interpreters.data}
            totalRows={interpreters.total_records ?? ADMIN_INTERPRETER_PER_PAGE}
            page={currentPage}
            totalPages={interpreters.total_pages}
            perPage={interpreters.perPage}
            handlePerPageChange={handlePerPageChange}
            handlePageChange={handlePageChange}
            dataTableType={DATATABLE_TYPE.interpreter}
            orderBy={orderBy}
            order={order}
            handleSortChange={handleSortChange}
          />
        </Row>
      </Paper>
    </div>
  );
}
