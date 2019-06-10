import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import store, { history } from './store';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#006ba9',
    },
    secondary: {
      main: '#5bb0e1',
    },
  },
});

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root'),
);
