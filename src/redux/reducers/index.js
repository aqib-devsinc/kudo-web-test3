import { combineReducers } from 'redux';
import actionTypes from 'redux/actions/actionTypes';
import initialState from './initialState';
import auth from './auth';
import projects from './projects';
import search from './search';
import modal from './modal';
import languages from './languages';
import admin from './admin';

const rootReducer = combineReducers({
  auth,
  projects,
  search,
  modal,
  languages,
  admin,
});

export default (state, action) => rootReducer(action.type === actionTypes.RESET_APP_STATE
  ? {
    ...initialState,
    auth: {
      ...state.auth,
      ...initialState.auth,
    },
  } : state,
action);
