/* globals it, expect */
import * as actionTypes from '../actionTypes';
import reducer from '.';

it('should update isSubmitting in state', () => {
  expect(
    reducer({ value: true }, {
      type: actionTypes.IS_SUBMITTING,
      payload: {
        value: false,
      },
    }),
  ).toEqual({ value: true });
});

it('should update signingUp in state', () => {
  expect(
    reducer({ value: true }, {
      type: actionTypes.SIGNING_UP,
      payload: {
        value: false,
      },
    }),
  ).toEqual({ value: true });
});

it('should update languages in state', () => {
  const languages = [{
    value: 'code-1',
    label: 'language-1',
  }, {
    value: 'code-2',
    label: 'language-2',
  }, {
    value: 'code-3',
    label: 'language-3',
  }];
  expect(
    reducer({
      value: languages,
    }, {
      type: actionTypes.GET_LANGUAGES_ASYNC,
      payload: {
        value: [],
      },
    }),
  ).toEqual({ value: languages });
});

it('should update serverErrors in state', () => {
  const errorFromServer = [
    { name: 'email', reason: 'Invalid email' },
    { name: 'preferredLanguage', reason: 'Invalid language' },
  ];
  expect(
    reducer({
      value: errorFromServer,
    }, {
      type: actionTypes.ADD_SERVER_ERRORS,
      payload: {
        value: [],
      },
    }),
  ).toEqual({ value: errorFromServer });
});

it('should update notification in state', () => {
  const notification = {
    visible: true,
    type: 'success',
    message: 'Test message',
  };
  expect(
    reducer({
      value: notification,
    }, {
      type: actionTypes.ADD_SERVER_ERRORS,
      payload: {
        visible: false,
      },
    }),
  ).toEqual({ value: notification });
});
