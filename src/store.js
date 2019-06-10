import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import sagas from './sagas';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const initialState = {
  languages: [],
  signingUp: false,
  serverErrors: [],
  notification: {
    visible: false,
  },
  isSubmitting: false,
};

const middleware = [thunk, routerMiddleware(history)];

const composedEnhancers = compose(
  composeWithDevTools(
    applyMiddleware(
      sagaMiddleware,
      ...middleware,
    ),
  ),
);

const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composedEnhancers,
);

sagaMiddleware.run(sagas);

export default store;
