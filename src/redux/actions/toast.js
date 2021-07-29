import actionTypes from './actionTypes';

export const showToast = (payload) => ({
  type: actionTypes.SHOW_TOAST,
  payload,
});
