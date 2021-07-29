import actionTypes from './actionTypes';

export const getAdminProjectsRequest = (payload) => ({
  type: actionTypes.GET_ADMIN_PROJECTS_REQUEST,
  payload,
});

export const setAdminProjectsSuccess = (payload) => ({
  type: actionTypes.SET_ADMIN_PROJECTS_SUCCESS,
  payload,
});

export const getAdminProjectsStatsRequest = (payload) => ({
  type: actionTypes.GET_ADMIN_PROJECTS_STATS_REQUEST,
  payload,
});

export const setAdminProjectsStatsSuccess = (payload) => ({
  type: actionTypes.SET_ADMIN_PROJECTS_STATS_SUCCESS,
  payload,
});

export const getAdminInterpretersRequest = (payload) => ({
  type: actionTypes.GET_ADMIN_INTERPRETERS_REQUEST,
  payload,
});

export const setAdminInterpretersSuccess = (payload) => ({
  type: actionTypes.SET_ADMIN_INTERPRETERS_SUCCESS,
  payload,
});

export const setAdminProjectsPage = (payload) => ({
  type: actionTypes.SET_ADMIN_PROJECTS_PAGE,
  payload,
});

export const setAdminInterpretersPage = (payload) => ({
  type: actionTypes.SET_ADMIN_PROJECTS_PAGE,
  payload,
});

export const updateAdminInterpretersRoles = (payload) => ({
  type: actionTypes.UPDATE_ADMIN_INTERPRETERS_ROLES,
  payload,
});

export const setAdminInterpretersRoles = (payload) => ({
  type: actionTypes.SET_ADMIN_INTERPRETERS_ROLES,
  payload,
});
