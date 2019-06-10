/* globals it, describe */
import { testSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';

import * as sagas from '.';
import * as actionTypes from '../actionTypes';

describe.only('getLanguages', () => {
  it('should get the languages from the languages API', () => {
    const saga = testSaga(sagas.getLanguages);
    const fetchLanguagesApiResult = () => ({
      data: {
        languages: {
          'language-code': 'language',
        },
      },
    });

    saga.next()
      .call(sagas.fetchLanguagesApi)
      .next(fetchLanguagesApiResult())
      .next() // Let's get passed the silly delay.
      .put({
        type: actionTypes.GET_LANGUAGES_ASYNC,
        value: [{
          value: 'language-code',
          label: 'language',
        }],
      })
      .next()
      .isDone();
  });
});

describe.only('signUpAsync', () => {
  it('should have success with signing up', () => {
    const payload = {
      type: actionTypes.SIGN_UP,
      values: {
        email: 'email@domain.com',
        password: 's0mEP@$sw0rd',
        confirmpassword: 's0mEP@$sw0rd',
        preferredLanguage: 'code',
      },
    };
    const saga = testSaga(sagas.signUpAsync, payload);
    const fetchSignUpApiResult = { success: true };

    saga.next()
      .put({ type: actionTypes.IS_SUBMITTING, value: true })
      .next()
      .call(sagas.fetchSignUpApi, payload.values)
      .next(fetchSignUpApiResult)
      .next() // Let's get passed the silly delay.
      .put({ type: actionTypes.SIGN_UP_SUCCESS, success: true })
      .next()
      .put({
        type: actionTypes.NOTIFICATION,
        payload: {
          visible: true,
          type: 'success',
          message: 'Thank you for signing up. Let\'s do this.',
        },
      })
      .next()
      .put(push('/welcome'));
  });

  it('should have errors when signing up', () => {
    const payload = {
      type: actionTypes.SIGN_UP,
      values: {
        email: 'newuser@serko.com',
        password: 'abc123',
        confirmpassword: 'abc123',
        preferredLanguage: '',
      },
    };
    const saga = testSaga(sagas.signUpAsync, payload);
    const fetchSignUpApiResult = {
      data: {
        title: 'Result description',
        'invalid-params': [
          {
            name: 'field-name',
            reason: 'Some reason',
          },
          {
            name: 'another-field-name',
            reason: 'Some different reason',
          },
        ],
      },
    };

    saga.next()
      .put({ type: actionTypes.IS_SUBMITTING, value: true })
      .next()
      .call(sagas.fetchSignUpApi, payload.values)
      .next(fetchSignUpApiResult)
      .next() // Let's get passed the silly delay.
      .put({ type: actionTypes.SIGN_UP_FAILURE, error: fetchSignUpApiResult.data.title })
      .next()
      .put({
        type: actionTypes.NOTIFICATION,
        payload: {
          visible: true,
          type: 'error',
          message: fetchSignUpApiResult.data.title,
        },
      })
      .next()
      .put({ type: actionTypes.ADD_SERVER_ERRORS, errors: fetchSignUpApiResult.data['invalid-params'] })
      .next()
      .put({ type: actionTypes.IS_SUBMITTING, value: false })
      .next()
      .isDone();
  });
});
