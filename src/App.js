import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import SignUp from './components/SignUp';
import Welcome from './components/Welcome';
import Notifications from './components/Notifications';
import * as actionTypes from './actionTypes';
import * as selectors from './selectors';

const App = props => (
  <>
    <Route exact path="/" component={SignUp} />
    <Route exact path="/welcome" component={Welcome} />
    <Notifications {...props} />
  </>
);

const mapStateToProps = state => ({
  notification: selectors.getNotification(state),
});

const mapDispachToProps = dispatch => ({
  handleNotification: ({ visible, type, message }) => dispatch({
    type: actionTypes.NOTIFICATION,
    payload: {
      visible,
      type,
      message,
    },
  }),
});

export default connect(
  mapStateToProps,
  mapDispachToProps,
)(App);
