import { all } from 'redux-saga/effects';
import authSaga from './auth';
import projectSagas from './projects';
import languageSagas from './languages';
import adminSagas from './admin';
import toastSagas from './toast';

function* rootSaga() {
  yield all([
    authSaga(),
    projectSagas(),
    languageSagas(),
    adminSagas(),
    toastSagas(),
  ]);
}

export default rootSaga;
