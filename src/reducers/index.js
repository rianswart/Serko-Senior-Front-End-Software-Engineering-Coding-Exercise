import * as actionTypes from '../actionTypes';

const initialState = {
  languages: [],
  signingUp: false,
  serverErrors: [],
  notification: {
    visible: false,
  },
  isSubmitting: false,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case actionTypes.SIGN_UP_SUCCESS:
      break;

    case actionTypes.SIGN_UP_FAILURE:
      break;

    case actionTypes.ADD_SERVER_ERRORS:
      newState.serverErrors = action.errors;
      break;

    case actionTypes.GET_LANGUAGES_ASYNC:
      newState.languages = action.value;
      break;

    case actionTypes.SIGNING_UP:
      newState.signingUp = action.value;
      break;

    case actionTypes.IS_SUBMITTING:
      newState.isSubmitting = action.value;
      break;

    case actionTypes.NOTIFICATION:
      newState.notification = {
        visible: action.payload.visible,
        type: action.payload.type,
        message: action.payload.message,
      };
      break;

    default:
      break;
  }

  return newState;
};

export default reducer;
