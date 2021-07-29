import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import queryString from 'query-string';
import utf8 from 'utf8';
import axios from 'axios';
import actionTypes from 'redux/actions/actionTypes';
import {
  deleteProjectSuccess,
  setCurrentProject,
  setProjectsSuccess,
  setSearchedProjects,
  addSearchedProjects,
  setProjectGlossary,
  updateTermSuccess,
  deleteTermsSuccess,
  addTermSuccess,
  getProjectGlossaryRequest,
  getProjectGlossaryStatsRequest,
  setProjectGlossaryStats,
  deleteProjectFileSuccess,
} from 'redux/actions/projects';
import { showToast } from 'redux/actions/toast';
import {
  deleteProject,
  getProjects,
  getProject,
  searchProjects,
  getProjectGlossary,
  updateTerm,
  deleteTerms,
  addTerm,
  getGlossaryStats,
  getMergedTableGlossary,
  deleteProjectFile,
} from 'api/projects';
import { PROJECT_TABS } from 'constants/home';

const getGlossary = (state) => state.projects.glossary;

export default function* projectsSaga() {
  let cancelToken;

  yield takeEvery(actionTypes.GET_PROJECTS_REQUEST, function* ({ payload: {
    type,
    page = 1,
    perPage = 8,
  } }) {
    let queryParams = `page=${page}&page_size=${perPage}`;

    if (type !== PROJECT_TABS.all.value) {
      queryParams = `type=${type}&${queryParams}`;
    }

    const response = yield getProjects(queryParams);

    if (response.error) {
      yield put(showToast({
        type: 'error',
        message: `Failed to fetch ${type} projects`,
      }))
      return;
    }

    yield put(setProjectsSuccess({
      projectType: type,
      data: response,
    }));
  });

  yield takeLatest(actionTypes.GET_SEARCHED_PROJECTS_REQUEST, function* ({ payload: { type, searchTerm, page = 1 } }) {
    let queryParams = `search_string=${encodeURIComponent(window.btoa(utf8.encode(searchTerm)))}&page=${page}`;

    if (type !== PROJECT_TABS.all.value) {
      queryParams = `type=${type}&${queryParams}`;
    }

    if (typeof cancelToken !== 'undefined') {
      cancelToken.cancel();
    }

    cancelToken = axios.CancelToken.source();

    const response = yield searchProjects(queryParams, cancelToken);

    if (response.error) {
      yield put(showToast({
        type: 'error',
        message: 'Failed to fetch search results',
      }))
      return;
    }

    if (page > 1) {
      yield put(addSearchedProjects(response));
      return;
    }

    yield put(setSearchedProjects(response));
  });

  yield takeEvery(actionTypes.DELETE_PROJECT_REQUEST, function* ({ payload }) {
    const response = yield deleteProject(payload.id);

    if (response.error) {
      yield put(showToast({
        type: 'error',
        message: response?.data?.message ?? response?.data?.detail ?? 'Failed to delete glossary',
      }))
      return;
    }

    yield put(showToast({
      type: 'success',
      message: 'Glossary deleted successfully',
    }))
    yield put(deleteProjectSuccess(payload));
  });

  yield takeEvery(actionTypes.DELETE_PROJECT_FILE_REQUEST, function* ({ payload }) {
    const response = yield deleteProjectFile(payload.id, payload.fileId);

    if (response.error) {
      yield put(showToast({
        type: 'error',
        message: response?.data?.message ?? response?.data?.detail ?? 'Failed to delete file',
      }))
      return;
    }

    yield put(showToast({
      type: 'success',
      message: 'File deleted successfully',
    }))
    yield put(deleteProjectFileSuccess(payload));
  });

  yield takeLatest(actionTypes.GET_CURRENT_PROJECT_REQUEST, function* ({ payload: projectId }) {
    const response = yield getProject(projectId);

    if (response.error) {
      yield put(showToast({
        type: 'error',
        message: response?.data?.message ?? response?.data?.detail ?? 'Failed to fetch glossary',
      }))
      return;
    }

    yield put(setCurrentProject(response.project));
  });

  yield takeLatest(actionTypes.GET_PROJECT_GLOSSARY_REQUEST, function* ({ payload: {
    projectId: id,
    mergedProjectIds = [],
    page = 1,
    perPage = 10,
    searchTerm = '',
    orderBy,
    order,
    orderByLang,
    searchFilter,
    mergeGlossaryTableName,
  } }) {
    if (typeof cancelToken !== 'undefined') {
      cancelToken.cancel();
    }

    let queryParams = `page=${page}&page_size=${perPage}`;

    if (!mergeGlossaryTableName && mergedProjectIds.length) {
      queryParams += `&${mergedProjectIds
        .map(((mergedProjectId) => `id[]=${mergedProjectId}`))
        .join('&')}`;
    }

    if (searchTerm) {
      const encodedSearchTerm = encodeURIComponent(window.btoa(utf8.encode(searchTerm)));
      if (searchFilter.lang) {
        queryParams += `&search_string=${encodedSearchTerm}&lang=${searchFilter.lang}&col=${searchFilter.col}`;
      } else if (searchFilter.col) {
        queryParams += `&search_string=${encodedSearchTerm}&col=${searchFilter.col}`;
      } else {
        queryParams += `&search_string=${encodedSearchTerm}`;
      }
    }

    if (orderBy) queryParams += `&order_by=${orderBy}`;
    if (order) queryParams += `&sort=${order}`;
    if (orderByLang) queryParams += `&order_by_lang=${orderByLang}`;

    cancelToken = axios.CancelToken.source();

    let response;

    if (!mergeGlossaryTableName) {
      response = yield getProjectGlossary({
        id,
        queryParams,
        cancelToken,
      });
    } else {
      response = yield getMergedTableGlossary({
        id,
        queryParams,
        mergeGlossaryTableName,
        cancelToken,
      });
      response.terms = response.combined_glossaries;
      delete response.combined_glossaries;
    }

    if (response.error) {
      yield put(showToast({
        type: 'error',
        message: response?.data?.message ?? response?.data?.detail ?? 'Failed to fetch glossary',
      }))
      return;
    }

    yield put(setProjectGlossary({
      response,
      page,
      perPage,
      reset: !(page > 1),
    }));
  });

  yield takeLatest(actionTypes.ADD_TERM_REQUEST, function* ({ payload: {
    projectId,
    data,
  } }) {
    const response = yield addTerm(projectId, data);

    if (response.error) {
      yield put(showToast({
        type: 'error',
        message: response?.data?.detail ?? response?.data?.messsage ?? 'Failed to save term',
      }))
      return;
    }

    yield put(showToast({
      type: 'success',
      message: 'Term(s) created successfully!',
    }))

    yield put(addTermSuccess(response));
    yield put(getProjectGlossaryStatsRequest(projectId));
  });

  yield takeLatest(actionTypes.GET_PROJECT_GLOSSARY_STATS_REQUEST, function* ({ payload: projectId }) {
    const response = yield getGlossaryStats(projectId);

    if (response.error) return;

    yield put(setProjectGlossaryStats(response));
  });

  yield takeLatest(actionTypes.UPDATE_TERM_REQUEST, function* ({ payload }) {
    const response = yield updateTerm(payload.projectId, payload.data);

    if (response.error) {
      yield put(showToast({
        type: 'error',
        message: response?.data?.detail ?? 'Failed to update term',
      }))
      return;
    }

    yield put(updateTermSuccess(response));
  });

  yield takeLatest(actionTypes.DELETE_TERMS_REQUEST, function* ({ payload }) {
    const response = yield deleteTerms(payload.projectId, payload.termIds);

    if (response.error) {
      yield put(showToast({
        type: 'error',
        message: response?.data?.detail ?? 'Failed to delete term(s)',
      }))
      return;
    }

    yield put(showToast({
      type: 'success',
      message: 'Term(s) deleted successfully!',
    }))
    yield put(deleteTermsSuccess(payload.termIds));
    const { terms, page, per_page } = yield select(getGlossary);
    const qp = queryString.parse(window.location.search);

    if ((terms.length % per_page) - payload.termIds.length <= 0) {
      yield put(getProjectGlossaryRequest({
        projectId: payload.projectId,
        page: page - 1 > 0 ? page - 1 : 1,
        perPage: per_page,
        searchTerm: qp.search_term,
        orderBy: qp.order_by,
        order: qp.order,
        orderByLang: qp.order_by_lang,
        searchFilter: {
          lang: qp.search_lang,
          col: qp.search_col,
        },
      }));
    } else {
      yield put(getProjectGlossaryStatsRequest(payload.projectId));
    }
  });
}
