import utf8 from 'utf8';
import { put, takeLatest, select } from 'redux-saga/effects';
import { showToast } from 'redux/actions/toast';
import actionTypes from 'redux/actions/actionTypes';
import {
  setAdminProjectsSuccess,
  setAdminProjectsStatsSuccess,
  setAdminInterpretersSuccess,
  setAdminInterpretersRoles,
} from 'redux/actions/admin';
import { setCurrentUserRoles } from 'redux/actions/auth';

import {
  getAdminProjects,
  getAdminInterpreters,
  getAdminProjectsStats,
  updateUserRoles,
} from 'api/admin';

const getCurrentUser = (state) => state.auth.user;

export default function* adminSaga() {
  yield takeLatest(actionTypes.GET_ADMIN_PROJECTS_REQUEST, function* ({ payload: {
    page = 1,
    perPage = 10,
    searchTerm = '',
    orderBy,
    order,
  } }) {
    let queryParams = `page=${page}&page_size=${perPage}`;

    if (searchTerm) {
      queryParams += `&search_string=${encodeURIComponent(window.btoa(utf8.encode(searchTerm)))}`;
    }

    if (orderBy) queryParams += `&order_by=${orderBy}`;
    if (order) queryParams += `&sort=${order}`;

    const response = yield getAdminProjects(queryParams);

    if (response.error) {
      yield put(showToast({
        type: 'error',
        message: response?.data.message ?? response?.data?.detail ?? 'Failed to fetch Projects',
      }))
      return;
    }

    yield put(setAdminProjectsSuccess({
      data: response,
      page,
      perPage,
    }));
  });

  yield takeLatest(actionTypes.GET_ADMIN_INTERPRETERS_REQUEST, function* ({ payload: {
    page = 1,
    perPage = 10,
    searchTerm = '',
    orderBy,
    order,
  } }) {
    let queryParams = `page=${page}&page_size=${perPage}`;

    if (searchTerm) {
      queryParams += `&search_string=${encodeURIComponent(window.btoa(utf8.encode(searchTerm)))}`;
    }

    if (orderBy) queryParams += `&order_by=${orderBy}`;
    if (order) queryParams += `&sort=${order}`;

    const response = yield getAdminInterpreters(queryParams);

    if (response.error) {
      yield put(showToast({
        type: 'error',
        message: response?.data.message ?? response?.data?.detail ?? 'Failed to fetch interpreters',
      }));
      return;
    }

    yield put(setAdminInterpretersSuccess({
      data: response,
      page,
      perPage,
    }));
  });

  yield takeLatest(actionTypes.GET_ADMIN_PROJECTS_STATS_REQUEST, function* ({ payload }) {
    const response = yield getAdminProjectsStats();

    if (response.error) {
      yield put(showToast({
        type: 'error',
        message: response?.data.message ?? response?.data?.detail ?? 'Failed to fetch glossary stats',
      }));
      return;
    }

    yield put(setAdminProjectsStatsSuccess({ data: response }));
  });

  yield takeLatest(actionTypes.UPDATE_ADMIN_INTERPRETERS_ROLES, function* ({ payload }) {
    const response = yield updateUserRoles(payload?.id, payload?.roles);

    if (response.error) {
      yield put(showToast({
        type: 'error',
        message: response?.data.message ?? response?.data?.detail ?? 'Failed to update role',
      }));
      return;
    }

    yield put(showToast({
      type: 'success',
      message: 'Role updated successfully',
    }));

    yield put(setAdminInterpretersRoles({
      id: payload.id,
      roles: response.roles,
    }));

    const { id: currentUserId } = yield select(getCurrentUser);

    if (currentUserId === payload.id) {
      yield put(setCurrentUserRoles({
        id: payload?.id,
        roles: response.roles,
      }));
    }
  });
}
