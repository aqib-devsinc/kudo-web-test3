import React, { memo, useCallback, useState, useEffect, useMemo } from 'react';
import PropTypes, { number } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
} from '@material-ui/core';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import SVG from 'react-inlinesvg';
import { isEqual } from 'lodash';
import { useStyles } from 'styles/projectDetails';
import { GLOSSARY_DEFAULT_PAGE, SORTING_DIRECTION } from 'constants/projectDetails';
import { getProjectGlossaryRequest, setGlossaryPage } from 'redux/actions/projects';
import useDebounce from 'custom-hooks/useDebounce';
import usePrevious from 'custom-hooks/usePrevious';
import urls from 'constants/urls';
import GlossaryTerm from './GlossaryTerm';
import GlossaryTablePagination from './GlossaryTablePagination';

function GlossaryTable({
  isEditing,
  languageCols,
  checkedTermsRef,
  searchTerm,
  isNewTermAdded,
  setIsNewTermAdded,
  toggleTermsDeleted,
  handleColsOrderChange,
  mergedProjects,
  query,
  setQuery,
  mergeGlossaryTableName,
  setRowChecked,
  setIsEmptyRowAdded,
}) {
  const [checked, setChecked] = useState(false);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const {
    terms,
    total_records,
    total_pages,
    per_page,
    page,
    languages,
  } = useSelector(({ projects }) => projects.glossary);
  const [tableLanguages, setTableLanguages] = useState(languages);
  const [displayedTerms, setDisplayedTerms] = useState(terms);
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const classes = useStyles();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const detachedRouteMatched = useRouteMatch(urls.detachedProjectGlossary);
  const prevSearchTerm = usePrevious(debouncedSearchTerm);
  const displayedTermsStartIndex = 0;
  const mergedProjectIds = mergedProjects.map((mergedProject) => mergedProject.id);
  const searchFilter = useMemo(() => ({
    lang: query.search_lang,
    col: query.search_col,
  }), [query.search_lang, query.search_col]);

  useEffect(() => setDisplayedTerms(terms), [terms]);

  useEffect(() => {
    if (query.page === page) return;

    setQuery({ page });
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    if (query.per_page !== per_page) setQuery({ per_page });
  }, [per_page]);

  useEffect(() => {
    if (!prevSearchTerm && !searchTerm) return;

    setQuery({ search_term: debouncedSearchTerm });

    dispatch(getProjectGlossaryRequest({
      projectId,
      page: GLOSSARY_DEFAULT_PAGE,
      perPage: query.per_page,
      searchTerm,
      orderBy: query.order_by,
      order: query.order,
      orderByLang: query.order_by_lang,
      mergedProjectIds,
      searchFilter,
      mergeGlossaryTableName,
    }));
  }, [debouncedSearchTerm, mergedProjects]);

  useEffect(() => {
    if (!debouncedSearchTerm) return;

    dispatch(getProjectGlossaryRequest({
      projectId,
      page: GLOSSARY_DEFAULT_PAGE,
      perPage: query.per_page,
      searchTerm,
      orderBy: query.order_by,
      order: query.order,
      orderByLang: query.order_by_lang,
      mergedProjectIds,
      searchFilter,
      mergeGlossaryTableName,
    }));
  }, [searchFilter]);

  useEffect(() => {
    if (!isNewTermAdded) return;

    setIsNewTermAdded(false);
    setIsEmptyRowAdded(true);

    if (!displayedTerms[displayedTermsStartIndex]?.id && !!displayedTerms.length) return;

    const copiedTerms = [...displayedTerms];
    copiedTerms.splice(displayedTermsStartIndex, 0, { translations: [] });

    setDisplayedTerms(copiedTerms);
  }, [isNewTermAdded]);

  useEffect(() => {
    if (displayedTerms) {
      if (!displayedTerms[displayedTermsStartIndex]?.id) {
        const copiedTerms = [...displayedTerms];
        copiedTerms.splice(0, 1);
        setDisplayedTerms(copiedTerms);
      }
    }

    if (checked) setChecked(false);
    if (checkedTermsRef.current.length) {
      setRowChecked(false);
      checkedTermsRef.current = [];
    }
  }, [toggleTermsDeleted]);

  useEffect(() => {
    for (const lang of Object.values(languageCols)) {
      for (const col of lang.cols) {
        if (col.checked) {
          setShowCheckbox(true);
          return;
        }
      }
    }

    setShowCheckbox(false);
  }, [languageCols]);

  useEffect(() => {
    const queryLanguages = query.filter?.map((lang) => lang.split('-')[0]);

    if (isEqual([...new Set(queryLanguages)], tableLanguages.map((lang) => lang.value))) return;

    const appLanguages = languages.map((lang) => lang.value);
    const languagesToShow = appLanguages.filter((lang) => queryLanguages?.indexOf(lang) !== -1);

    if (isEqual(languagesToShow, tableLanguages.map((lang) => lang.value))
      && isEqual(languagesToShow, appLanguages)
    ) return;

    setTableLanguages(languages.filter((lang) => languagesToShow.indexOf(lang.value) !== -1));
  }, [query.filter, languages]);

  const handleAllTermCheckChange = useCallback(() => {
    if (checked) {
      checkedTermsRef.current = [];
      setRowChecked(false);
    } else {
      checkedTermsRef.current = displayedTerms.reduce((checkedTerms, term) => {
        if (term.id) checkedTerms.push(term.id);

        return checkedTerms;
      }, []);
      setRowChecked(true);
    }

    setChecked(!checked);
  }, [checked, checkedTermsRef.current, displayedTerms]);

  const handleTermCheckChange = useCallback(({ termId, checked: isTermChecked }) => {
    if (isTermChecked) {
      setRowChecked(true);
      return checkedTermsRef.current.push(termId);
    }

    checkedTermsRef.current = checkedTermsRef.current.filter((tId) => tId !== termId);
    if (!checkedTermsRef.current.length) setRowChecked(false);
  }, [checkedTermsRef.current]);

  const handlePageChange = useCallback(
    (nextPage) => {
      if (!nextPage) return;

      if (nextPage > total_pages) return;

      dispatch(setGlossaryPage(nextPage));

      if (checked) setChecked(false);
      if (checkedTermsRef.current.length) {
        setRowChecked(false);
        checkedTermsRef.current = [];
      }

      dispatch(
        getProjectGlossaryRequest({
          projectId,
          page: nextPage,
          perPage: query.per_page,
          orderBy: query.order_by,
          order: query.order,
          orderByLang: query.order_by_lang,
          mergedProjectIds,
          searchTerm: debouncedSearchTerm,
          searchFilter,
          mergeGlossaryTableName,
        }),
      );
    },
    [
      query.per_page,
      query.order_by,
      query.order,
      mergedProjectIds,
      debouncedSearchTerm,
      searchFilter,
      mergeGlossaryTableName,
      checkedTermsRef.current,
      total_pages,
    ],
  );

  const handlePerPageChange = useCallback(({ target: { value } }) => {
    setQuery({ per_page: value });

    dispatch(getProjectGlossaryRequest({
      projectId,
      page: GLOSSARY_DEFAULT_PAGE,
      perPage: value,
      searchTerm: debouncedSearchTerm,
      orderBy: query.order_by,
      order: query.order,
      orderByLang: query.order_by_lang,
      mergedProjectIds,
      searchFilter,
      mergeGlossaryTableName,
    }));
  }, [
    debouncedSearchTerm,
    query.order_by,
    query.order,
    query.order_by_lang,
    mergedProjectIds,
    searchFilter,
    mergeGlossaryTableName,
  ]);

  const handleColSortChange = useCallback((colValue, lang) => {
    const sortOrder = query.order_by === colValue && query.order === SORTING_DIRECTION.asc
      ? SORTING_DIRECTION.desc
      : SORTING_DIRECTION.asc;

    setQuery({
      order_by: colValue,
      order: sortOrder,
      order_by_lang: lang,
    });

    dispatch(getProjectGlossaryRequest({
      projectId,
      page: GLOSSARY_DEFAULT_PAGE,
      perPage: query.per_page,
      searchTerm: debouncedSearchTerm,
      orderBy: colValue,
      order: sortOrder,
      orderByLang: lang,
      mergedProjectIds,
      mergeGlossaryTableName,
    }));
  }, [
    query.order_by,
    query.order,
    query.per_page,
    query.order_by_lang,
    debouncedSearchTerm,
    mergedProjectIds,
    mergeGlossaryTableName,
  ]);

  return (
    <>
      <div className={classes.tableWrapper}>
        <Table size='small' className={classes.table}>
          <TableHead>
            <TableRow>
              {
                !detachedRouteMatched && (
                  <>
                    <TableCell className={classes.newTermTd} />
                    <TableCell className={`${classes.cellBorder} ${classes.termTd}`} />
                  </>
                )
              }
              {
                tableLanguages?.map((lang) => (
                  <TableCell
                    key={lang.value}
                    colSpan={languageCols[lang.value]?.cols.filter((col) => col.checked === true).length}
                    className={classes.cellBorder}
                    data-lang={lang.value}
                  >
                    { lang.label }
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableHead>
            <SortableList
              axis='x'
              lockAxis='x'
              distance={1}
              languageCols={languageCols}
              glossaryLanguages={tableLanguages}
              classes={classes}
              checked={checked}
              order={query.order}
              orderBy={query.order_by}
              orderByLang={query.order_by_lang}
              detachedRouteMatched={detachedRouteMatched}
              onSortEnd={handleColsOrderChange}
              onSortChange={handleColSortChange}
              onAllTermCheckChange={handleAllTermCheckChange}
              showCheckbox={showCheckbox}
              isEditing={isEditing}
            />
          </TableHead>
          <TableBody>
            {
              displayedTerms.map((term, index) => (
                <GlossaryTerm
                  key={`${term.id}-${index}`}
                  index={index}
                  isEditing={isEditing}
                  allChecked={checked}
                  onCheckChange={handleTermCheckChange}
                  languageCols={languageCols}
                  tableLanguages={tableLanguages}
                  showCheckbox={showCheckbox}
                  {...term}
                />
              ))
            }
          </TableBody>
        </Table>
      </div>
      <GlossaryTablePagination
        mergeGlossaryTableName={mergeGlossaryTableName}
        page={query.page}
        totalRows={total_records}
        totalPages={total_pages}
        perPage={query.per_page}
        perPageOptions={[10, 20, 50, 100]}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
    </>
  );
}

GlossaryTable.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  languageCols: PropTypes.object.isRequired,
  checkedTermsRef: PropTypes.shape({ current: PropTypes.arrayOf(number) }).isRequired,
  toggleTermsDeleted: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired,
  isNewTermAdded: PropTypes.bool.isRequired,
  mergedProjects: PropTypes.arrayOf(PropTypes.objectOf({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  query: PropTypes.object.isRequired,
  setQuery: PropTypes.func.isRequired,
  setIsNewTermAdded: PropTypes.func.isRequired,
  handleColsOrderChange: PropTypes.func.isRequired,
  mergeGlossaryTableName: PropTypes.string.isRequired,
  setRowChecked: PropTypes.func.isRequired,
  setIsEmptyRowAdded: PropTypes.func.isRequired,
};

const SortableList = SortableContainer(({
  languageCols,
  glossaryLanguages,
  classes,
  checked,
  order,
  orderBy,
  orderByLang,
  detachedRouteMatched,
  showCheckbox,
  isEditing,
  onAllTermCheckChange,
  onSortChange,
}) => (
  <TableRow>
    {
      !detachedRouteMatched && (
        <>
          <TableCell className={classes.newTermTd} />
          <TableCell className={`${classes.cellBorder} ${classes.termTd}`}>

            {
              (isEditing && showCheckbox) && <Checkbox checked={checked} onChange={onAllTermCheckChange} />
            }
          </TableCell>
        </>
      )
    }
    {
      glossaryLanguages.map((lang, langIndex) => (
        languageCols[lang.value]?.cols.filter((col) => col.checked === true).length ? (
          languageCols[lang.value].cols
            .filter((col) => col.checked === true)
            .map((col, index, { length }) => (
              <SortableItem
                key={`${lang.value}-${col.value}`}
                classes={classes}
                col={col}
                orderBy={orderBy}
                order={order}
                orderByLang={orderByLang}
                language={lang.value}
                index={`${lang.value}-${5 * langIndex + index}`}
                colsIndex={index}
                length={length}
                onSortChange={onSortChange}
              />
            ))
        ) : (
          null
        )
      ))
    }
  </TableRow>
));

const SortableItem = SortableElement(({
  classes,
  col,
  order,
  orderBy,
  language,
  colsIndex,
  length,
  onSortChange,
}) => (
  <TableCell
    className={`${classes.subHeading} ${
      colsIndex === length - 1 ? classes.cellBorder : null
    }`}
  >
    <TableSortLabel
      active={orderBy === col.value}
      hideSortIcon
      direction={orderBy === col.value ? order : SORTING_DIRECTION.desc}
      onClick={onSortChange.bind(this, col.value, language)}
    >
      { col.label }
      {
        orderBy === null ? (
          <SVG className='ml-1' src='/media/svg/icons/General/Nosort.svg' height={14} width={14} />
        ) : null
      }
    </TableSortLabel>
  </TableCell>
));

export default memo(GlossaryTable);
