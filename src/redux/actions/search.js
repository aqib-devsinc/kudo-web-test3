import actionTypes from './actionTypes';

export const setSearchTerm = (payload) => ({
  type: actionTypes.SET_SEARCH_TERM,
  payload,
});

export const setSearchResults = (payload) => ({
  type: actionTypes.SET_SEARCH_RESULTS,
  payload,
});
