import actionTypes from './actionTypes';

export const getLanguagesRequest = (payload) => ({
  type: actionTypes.GET_LANGUAGES_REQUEST,
  payload,
});

export const setLanguages = (payload) => ({
  type: actionTypes.SET_LANGUAGES,
  payload,
});
