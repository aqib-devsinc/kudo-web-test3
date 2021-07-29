import actionTypes from './actionTypes';

export const login = (payload) => ({
  type: actionTypes.LOGIN,
  payload,
});

export const logoutRequest = () => ({ type: actionTypes.LOGOUT_REQUEST });
export const logoutSuccess = () => ({ type: actionTypes.LOGOUT_SUCCESS });

export const getCurrentUser = () => ({ type: actionTypes.GET_CURRENT_USER });

export const setCurrentUserRoles = (payload) => ({
  type: actionTypes.SET_CURRENT_USER_ROLES,
  payload,
});

export const setCurrentUser = (payload) => ({
  type: actionTypes.SET_CURRENT_USER,
  payload,
});
