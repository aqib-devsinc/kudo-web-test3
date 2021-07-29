import { takeEvery, select, call } from 'redux-saga/effects';
import actionTypes from 'redux/actions/actionTypes';
import Toaster from '_metronic/_partials/controls/Toaster';

const isAuthenticated = (state) => state.auth.isAuthenticated;

export default function* toastSagas() {
  yield takeEvery(actionTypes.SHOW_TOAST, function* ({ payload }) {
    const isAuth = yield select(isAuthenticated);

    if (!isAuth) return;

    yield call(() => Toaster(payload.type, payload.message));
  });
}
