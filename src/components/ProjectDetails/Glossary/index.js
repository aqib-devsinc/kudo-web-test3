import React, { useCallback, useEffect, useMemo, useState, useRef, memo } from 'react';
import {
  Paper,
  TextField,
  InputAdornment,
  Checkbox,
  Collapse,
  List,
  ListItem,
  FormControlLabel,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  CircularProgress,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import { Row, Col, Dropdown } from 'react-bootstrap';
import SVG from 'react-inlinesvg';
import { useSelector, useDispatch } from 'react-redux';
import { cloneDeep, isEqual } from 'lodash';
import { useRouteMatch } from 'react-router-dom';
import {
  useQueryParams,
  StringParam,
  NumberParam,
  ArrayParam,
  withDefault,
} from 'use-query-params';
import axios from 'axios';
import CustomSwitch from 'components/CustomSwitch';
import IconBox from 'components/IconBox';
import { useStyles } from 'styles/projectDetails';
import {
  GLOSSARY_TRANSLATION_ATTRS,
  GLOSSARY_DEFAULT_PAGE,
  GLOSSARY_DEFAULT_PER_PAGE,
} from 'constants/projectDetails';
import { PRIMARY_LANGS, PROJECT_TYPES, SHARE_TYPES } from 'constants/project';
import { showToast } from 'redux/actions/toast';
import { deleteTermsRequest, getProjectGlossaryRequest, resetGlossary } from 'redux/actions/projects';
import urls from 'constants/urls';
import useQuery from 'custom-hooks/useQuery';
import { getLangLabel } from 'helpers/languages';
import GlossaryTable from './GlossaryTable';
import ExportGlossary from './ExportGlossary';
import MergeGlossary from './MergeGlossary';
import SaveGlossary from './SaveGlossary';
import MergedGlossaries from './MergedGlossaries';
import ImportGlossary from './ImportGlossary';

function Glossary({
  containerClass,
  setGlossaryProcessing,
}) {
  const [searchTerm, setSearchTerm] = useState(useQuery().get('search_term'));
  const [isEditing, setIsEditing] = useState(false);
  const [isNewMergedProjectAdded, setIsNewMergedProjectAdded] = useState(false);
  const [languageCols, setLanguageCols] = useState(() => (Object.values(PRIMARY_LANGS).reduce((obj, lang) => {
    obj[lang.value] = {
      label: lang.label,
      value: lang.value,
      show: false,
      cols: Object.values(GLOSSARY_TRANSLATION_ATTRS).map((col) => ({
        ...col,
        checked: col.value === GLOSSARY_TRANSLATION_ATTRS.term.value,
      })),
    };
    return obj;
  }, {})));
  const [mergeGlossaryTableName, setMergeGlossaryTableName] = useState('');
  const [isRowChecked, setRowChecked] = useState(false);
  const [filterColsMenuAnchorEl, setFilterColsMenuAnchorEl] = useState(null);
  const [isNewTermAdded, setIsNewTermAdded] = useState(false);
  const [isEmptyRowAdded, setIsEmptyRowAdded] = useState(false);
  const [toggleTermsDeleted, setToggleTermsDeleted] = useState(false);
  const [mergedProjects, setMergedProjects] = useState([]);
  const [generateGlossaryLoader, setGenerateGlossaryLoader] = useState(false);
  const checkedTermsRef = useRef([]);
  const { project, glossary, currentUser } = useSelector(({ projects, auth }) => ({
    project: projects.current,
    glossary: projects.glossary,
    currentUser: auth.user,
  }));
  const dispatch = useDispatch();
  const { params: { projectId } } = useRouteMatch();
  const classes = useStyles();
  const detachedRouteMatched = useRouteMatch(urls.detachedProjectGlossary);
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, useQuery().get('page') || GLOSSARY_DEFAULT_PAGE),
    per_page: withDefault(NumberParam, useQuery().get('per_page') || GLOSSARY_DEFAULT_PER_PAGE),
    search_term: withDefault(StringParam, useQuery().get('search_term')),
    search_lang: withDefault(StringParam, useQuery().get('search_lang')),
    search_col: withDefault(StringParam, useQuery().get('search_col')),
    order_by: withDefault(StringParam, useQuery().get('order_by')),
    order_by_lang: withDefault(StringParam, useQuery().get('order_by_lang')),
    order: withDefault(StringParam, useQuery().get('order')),
    filter: withDefault(ArrayParam, useQuery().getAll('filter')),
  });
  const searchFilter = useMemo(() => ({
    lang: query.search_lang, col: query.search_col,
  }), [query.search_lang, query.search_col]);

  useEffect(() => {
    if (project.owner_id === currentUser.id || project.share_type === SHARE_TYPES.private.value) {
      setIsEditing(true);
    }

    const projectUser = project.project_users?.find((projtUser) => projtUser.user.id === currentUser.id);

    if (projectUser?.access_type === SHARE_TYPES.shared.accessTypes.edit.value) {
      setIsEditing(true);
    }
  }, [project]);

  useEffect(() => {
    dispatch(getProjectGlossaryRequest({
      projectId,
      page: query.page,
      perPage: query.per_page,
      searchTerm: query.search_term,
      orderBy: query.order_by,
      order: query.order,
      orderByLang: query.order_by_lang,
      searchFilter,
      mergeGlossaryTableName,
    }));

    return () => dispatch(resetGlossary());
  }, []);

  useEffect(() => {
    if (query.filter.length || !glossary.languages?.length) return;

    const filteredCols = glossary?.languages?.map((lang) => (
      `${lang?.value}-${GLOSSARY_TRANSLATION_ATTRS?.term?.value}`
    ));

    if (filteredCols) setQuery({ filter: filteredCols });
  }, [glossary.languages]);

  useEffect(() => {
    const updatedLanguagesCols = glossary?.languages?.reduce((obj, lang) => {
      obj[lang.value] = {
        label: lang.label,
        value: lang.value,
        show: !!languageCols[lang.value]?.show,
        cols: Object.values(GLOSSARY_TRANSLATION_ATTRS).map((col) => ({
          ...col,
          checked: query.filter.includes(`${lang.value}-${col.value}`),
        })),
      };
      return obj;
    }, {});

    if (updatedLanguagesCols && !isEqual(updatedLanguagesCols, languageCols)) setLanguageCols(updatedLanguagesCols);
  }, [query.filter, glossary.languages]);

  const setDefaultLanguageCols = useCallback(() => {
    const filteredCols = glossary?.languages?.map((lang) => (
      `${lang?.value}-${GLOSSARY_TRANSLATION_ATTRS?.term?.value}`
    ));

    if (filteredCols && !isEqual(query.filter, filteredCols)) setQuery({ filter: filteredCols });
  }, [glossary.languages, query.filter]);

  // const clearAllLanguageCols = useCallback(() => {
  //   setQuery({ filter: [] });
  // });

  const handleSearchChange = ({ target: { value } }) => {
    setSearchTerm(value);
  }

  const handleLanguageColsChange = useCallback((langValue, colValue) => {
    let filteredCols = [...query.filter];
    const newColFilter = `${langValue}-${colValue}`;

    if (filteredCols.includes(newColFilter)) {
      filteredCols = filteredCols.filter((colFilter) => colFilter !== newColFilter);
    } else {
      filteredCols.push(newColFilter);
    }

    setQuery({ filter: filteredCols });
  }, [query.filter]);

  const handleLangDropDownClick = useCallback((langValue) => {
    const langCols = cloneDeep(languageCols);

    langCols[langValue].show = !langCols[langValue].show;

    setLanguageCols(langCols);
  }, [languageCols]);

  const handleDeleteTerms = useCallback(() => {
    if (isEmptyRowAdded && !checkedTermsRef.current.length) {
      dispatch(showToast({
        type: 'error',
        message: 'Please select a term to delete.',
      }))
      return;
    }

    setToggleTermsDeleted(!toggleTermsDeleted);

    if (!checkedTermsRef.current.length) {
      dispatch(showToast({
        type: 'error',
        message: 'Please select a term to delete.',
      }))
      return
    }

    dispatch(deleteTermsRequest({
      projectId,
      termIds: checkedTermsRef.current,
    }));

    checkedTermsRef.current = [];
    setRowChecked(false);
  }, [isEmptyRowAdded, toggleTermsDeleted, checkedTermsRef.current]);

  const handleColsOrderChange = useCallback(({ oldIndex, newIndex }) => {
    const oldLang = oldIndex.split('-')[0];
    const newLang = newIndex.split('-')[0];
    const displayedColsOldIndex = oldIndex.split('-')[1] % 5;
    const displayedColsNewIndex = newIndex.split('-')[1] % 5;

    if (oldLang !== newLang) return;

    const clonedLangCols = cloneDeep(languageCols[oldLang].cols);
    const activeCols = clonedLangCols.filter((col) => col.checked === true);
    const colToBeMoved = activeCols[displayedColsOldIndex];
    const newCol = activeCols[displayedColsNewIndex];
    const oldColIndex = clonedLangCols.findIndex((col) => col.value === colToBeMoved.value);
    const newColIndex = clonedLangCols.findIndex((col) => col.value === newCol.value);

    clonedLangCols.splice(oldColIndex, 1);
    clonedLangCols.splice(newColIndex, 0, colToBeMoved);

    setLanguageCols({
      ...languageCols,
      [oldLang]: {
        ...languageCols[oldLang],
        cols: clonedLangCols,
      },
    });
  }, [languageCols]);

  const handleAddNewTerm = useCallback(() => {
    if (!isEditing) return;

    setIsNewTermAdded(true);
    setIsEmptyRowAdded(true);
  }, [isEditing]);

  const getSelectedSearchFilterLabel = useCallback(() => {
    if (!query.search_lang && !query.search_col) return 'in all columns';

    if (query.search_lang) return `in ${getLangLabel(query.search_lang, glossary.languages)} (term only)`;

    return 'in all languages (term only)';
  }, [query.search_lang, query.search_col, glossary.languages]);

  const handleSearchFilterChange = useCallback(({ lang, col }) => {
    if (query.search_lang === lang && query.search_col === col) return;

    setQuery({
      search_lang: lang, search_col: col,
    });
  }, [query.search_lang, query.search_col]);

  const handleGenerateGlossary = useCallback(() => {
    if (glossary.glossary_processing) return;

    setGenerateGlossaryLoader(true);
    const url = `/projects/${projectId}/glossary/process`;

    axios.post(url).then((res) => {
      setGlossaryProcessing(true);
      dispatch(showToast({
        type: 'success',
        message: res.data.message.message ?? 'Glossary processing started',
      }));
    }).catch((e) => {
      dispatch(showToast({
        type: 'error',
        message: e.response.data.message ?? e.response.data.details ?? 'Failed to start glossary processing',
      }));
    }).finally(() => {
      setGenerateGlossaryLoader(false);
    });
  }, [glossary.glossary_processing]);

  if (!Object.values(glossary).length) return null;

  return (
    <Paper className={`p-4 ${containerClass}`}>
      <Row className='justify-content-between' noGutters>
        <Col className='d-flex align-items-center'>
          <h3 className='mr-4'>Glossary</h3>
          {
            project.type !== PROJECT_TYPES.blankProject.id
            && (
              <button
                className={`btn ${glossary.glossary_processable ? 'btn-primary' : 'btn-light text-muted'} ml-6`}
                type='button'
                disabled={!glossary.glossary_processable}
                onClick={() => handleGenerateGlossary()}
              >
                <strong>Generate Glossary</strong>
                {generateGlossaryLoader && <CircularProgress size={14} className='ml-2' />}
              </button>
            )
          }
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
              endAdornment: (
                <InputAdornment>
                  <Dropdown>
                    <Dropdown.Toggle className='border-transparent'>
                      { getSelectedSearchFilterLabel() }
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={handleSearchFilterChange.bind(this, {
                          lang: '',
                          col: '',
                        })}
                      >
                        in all columns
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={handleSearchFilterChange.bind(this, {
                          lang: '',
                          col: GLOSSARY_TRANSLATION_ATTRS.term.value,
                        })}
                      >
                        in all languages (term only)
                      </Dropdown.Item>
                      {
                        glossary.languages.map((lang) => (
                          <Dropdown.Item
                            key={lang.value}
                            onClick={handleSearchFilterChange.bind(this, {
                              lang: lang.value,
                              col: GLOSSARY_TRANSLATION_ATTRS.term.value,
                            })}
                          >
                            in&nbsp;
                            { lang.label }
                            &nbsp;(term only)
                          </Dropdown.Item>
                        ))
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Col>
        {
          detachedRouteMatched && (
            <Col className='d-flex justify-content-end'>
              <div>
                <SaveGlossary
                  mergedProjectIds={mergedProjects.map((mergedProject) => mergedProject.id)}
                  setIsNewMergedProjectAdded={setIsNewMergedProjectAdded}
                />
                <MergedGlossaries
                  mergeGlossaryTableName={mergeGlossaryTableName}
                  setMergeGlossaryTableName={setMergeGlossaryTableName}
                  mergedProjects={mergedProjects}
                  setMergedProjects={setMergedProjects}
                  isNewMergedProjectAdded={isNewMergedProjectAdded}
                />
                <Tooltip title='Show/Hide columns' arrow>
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
                <ExportGlossary
                  searchTerm={searchTerm}
                  orderBy={query.order_by}
                  orderByLang={query.order_by_lang}
                  order={query.order}
                  searchFilter={searchFilter}
                  languageCols={languageCols}
                  mergedProjects={mergedProjects}
                />
                <MergeGlossary
                  mergeGlossaryTableName={mergeGlossaryTableName}
                  mergedProjects={mergedProjects}
                  setMergedProjects={setMergedProjects}
                />
              </div>
            </Col>
          )
        }
      </Row>
      {
        !detachedRouteMatched && (
          <Row className='justify-content-between mt-6' noGutters>
            {
              isEditing && (
                <Col>
                  <Tooltip title='Remove term(s)' arrow>
                    <span>
                      <IconBox className={`${isRowChecked ? 'bg-primary' : ''}`} onClick={handleDeleteTerms}>
                        <SVG src='/media/svg/icons/General/Trash.svg' />
                      </IconBox>
                    </span>
                  </Tooltip>
                </Col>
              )
            }
            <Col>
              <div className='float-right'>
                <Tooltip title='Show/Hide columns' arrow>
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
                <ExportGlossary
                  searchTerm={searchTerm}
                  orderBy={query.order_by}
                  order={query.order}
                  orderByLang={query.order_by_lang}
                  searchFilter={searchFilter}
                  languageCols={languageCols}
                />
                <ImportGlossary />
                <Tooltip title='Add new term' arrow>
                  <span>
                    <IconBox variant='primary' className='mr-4' onClick={handleAddNewTerm}>
                      <SVG src='/media/svg/icons/Navigation/Plus.svg' />
                    </IconBox>
                  </span>
                </Tooltip>
                <Tooltip title='Detach glossary'>
                  <span
                    role='presentation'
                    onClick={() => {
                      window.open(
                        `${window.location.pathname}/detached${window.location.search}`,
                        'glossary',
                        `width=${window.outerWidth},height=${window.outerHeight}`,
                      )
                    }}
                  >
                    <IconBox variant='dark' className='mr-4'>
                      <SVG src='/media/svg/icons/General/Size.svg' />
                    </IconBox>
                  </span>
                </Tooltip>
              </div>
            </Col>
          </Row>
        )
      }
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
        <MenuItem className='pointer' onClick={setDefaultLanguageCols}>Default</MenuItem>
        {/* <MenuItem className='pointer' onClick={clearAllLanguageCols}>Clear all</MenuItem> */}
        <hr className='m-0' />
        {
          glossary?.languages?.map((lang) => (
            <div key={lang.value}>
              <List className={classes.filteredColumnsList} disablePadding>
                <ListItem button onClick={handleLangDropDownClick.bind(this, lang.value)}>
                  { languageCols[lang?.value]?.show ? <ExpandLess /> : <ExpandMore /> }
                  <ListItemText primary={lang.label} />
                </ListItem>
                <Collapse in={languageCols[lang?.value]?.show} unmountOnExit>
                  <List disablePadding>
                    {
                      Object.values(GLOSSARY_TRANSLATION_ATTRS).map((attr) => (
                        <ListItem key={`${lang.value}-${attr.value}`}>
                          <FormControlLabel
                            control={(
                              <Checkbox
                                name={`${lang.value}-${attr.value}`}
                                checked={
                                  languageCols[lang?.value]?.cols.find((col) => col.value === attr.value)
                                    .checked
                                }
                                onChange={handleLanguageColsChange.bind(this, lang.value, attr.value)}
                              />
                            )}
                            label={attr.label}
                            className='w-100'
                          />
                        </ListItem>
                      ))
                    }
                  </List>
                </Collapse>
              </List>
            </div>
          ))
        }
      </Menu>
      <GlossaryTable
        isEditing={isEditing}
        languageCols={languageCols}
        checkedTermsRef={checkedTermsRef}
        setRowChecked={setRowChecked}
        toggleTermsDeleted={toggleTermsDeleted}
        searchTerm={searchTerm}
        isNewTermAdded={isNewTermAdded}
        query={query}
        setQuery={setQuery}
        mergedProjects={mergedProjects}
        setIsNewTermAdded={setIsNewTermAdded}
        handleColsOrderChange={handleColsOrderChange}
        mergeGlossaryTableName={mergeGlossaryTableName}
        setIsEmptyRowAdded={setIsEmptyRowAdded}
      />
    </Paper>
  );
}

Glossary.defaultProps = { containerClass: '' };

Glossary.propTypes = {
  containerClass: PropTypes.string,
  setGlossaryProcessing: PropTypes.func.isRequired,
};

export default memo(Glossary)
