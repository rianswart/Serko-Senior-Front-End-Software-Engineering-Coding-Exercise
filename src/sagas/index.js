import {
  takeLatest,
  put,
  call,
  delay,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import map from 'ramda/src/map';
import keys from 'ramda/src/keys';
import has from 'ramda/src/has';

import * as actionTypes from '../actionTypes';
import api from '../api';

export function fetchSignUpApi(payload) {
  return axios.post(api.signUp, payload)
    .then(response => response.data)
    .catch(error => error.response);
}

function* genericErrorNotification() {
  yield put({
    type: actionTypes.NOTIFICATION,
    payload: {
      visible: true,
      type: 'error',
      message: 'Oops! Somewhere something went wrong. Perhaps try again.',
    },
  });
}

export function* signUpAsync(payload) {
  try {
    yield put({ type: actionTypes.IS_SUBMITTING, value: true });

    const result = yield call(fetchSignUpApi, payload.values);

    // NOTE: This delay should never go out to production, but it's only for the purpose
    // of this test and how else would we see that awesome spinner ;)
    yield delay(3000);

    if (has('success')(result)) {
      yield put({ type: actionTypes.SIGN_UP_SUCCESS, success: result.success });
      yield put({
        type: actionTypes.NOTIFICATION,
        payload: {
          visible: true,
          type: 'success',
          message: 'Thank you for signing up. Let\'s do this.',
        },
      });
      yield put(push('/welcome'));
    }

    if (has('invalid-params')(result.data)) {
      yield put({ type: actionTypes.SIGN_UP_FAILURE, error: result.data.title });
      yield put({
        type: actionTypes.NOTIFICATION,
        payload: {
          visible: true,
          type: 'error',
          message: result.data.title,
        },
      });
      yield put({ type: actionTypes.ADD_SERVER_ERRORS, errors: result.data['invalid-params'] });
    }

    if (result.status === 404) {
      yield call(genericErrorNotification);
    }
  } catch (error) {
    yield put({ type: actionTypes.SIGN_UP_FAILURE, error });
  }

  yield put({ type: actionTypes.IS_SUBMITTING, value: false });
}

export const fetchLanguagesApi = () => axios.get(api.languages).then(response => response);

export function* getLanguages() {
  try {
    const languageAPIResponse = yield call(fetchLanguagesApi);

    // NOTE: This delay should never go out to production, but it's only for the purpose
    // of this test and how else would we see that awesome spinner ;)
    yield delay(3000);

    yield put({
      type: actionTypes.GET_LANGUAGES_ASYNC,
      value: map(language => ({
        value: language,
        label: languageAPIResponse.data.languages[language],
      }))(keys(languageAPIResponse.data.languages)),
    });
  } catch (error) {
    yield call(genericErrorNotification);
  }
}

function* watch() {
  yield takeLatest('SIGN_UP', signUpAsync);
  yield call(getLanguages);
}

export default watch;
