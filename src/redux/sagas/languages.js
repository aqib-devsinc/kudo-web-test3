import actionTypes from 'redux/actions/actionTypes';
import { setLanguages } from 'redux/actions/languages';
import { put, takeEvery } from 'redux-saga/effects';
import { getLanguagesRequest } from 'api/languages';

function* languageSagas() {
  yield takeEvery(actionTypes.GET_LANGUAGES_REQUEST, function* () {
    const payload = yield getLanguagesRequest();

    if (payload.error) return;

    yield put(setLanguages(payload));
  });
}

export default languageSagas;
