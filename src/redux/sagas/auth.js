import actionTypes from 'redux/actions/actionTypes';
import { setCurrentUser, logoutSuccess } from 'redux/actions/auth';
import { resetAppState } from 'redux/actions/app';
import { put, takeLatest } from 'redux-saga/effects';
import { getCurrentUser, logout } from 'api/auth';

function* authSaga() {
  yield takeLatest(actionTypes.GET_CURRENT_USER, function* () {
    const payload = yield getCurrentUser();

    if (payload.error) return;

    yield put(setCurrentUser(payload));
  });

  yield takeLatest(actionTypes.LOGOUT_REQUEST, function* () {
    yield logout();

    yield put(logoutSuccess());
    yield put(resetAppState());
  });
}

export default authSaga;
