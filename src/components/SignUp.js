import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import map from 'ramda/src/map';
import fromPairs from 'ramda/src/fromPairs';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import * as actionTypes from '../actionTypes';
import * as selectors from '../selectors';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: '#fafafa',
    },
  },
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  poweredBy: {
    marginTop: theme.spacing(2),
  },
  logo: {
    width: '50px',
    margin: '10px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: '100%',
  },
  container: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    [theme.breakpoints.up('sm')]: {
      top: '40%',
    },
    transform: 'translate(-50%, -50%)',
  },
  menuSpinnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(5, 'Password less than 5 char too weak')
    .matches(/([0-9])/, 'Password with no numbers too weak')
    .matches(/([a-z])/, 'Password with no lower too weak')
    .matches(/([A-Z])/, 'Password with no uppercase too weak')
    .required('Password is required'),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords don\'t match')
    .required('Please confirm your password'),
  preferredLanguage: Yup.string()
    .required('Invalid language'),
});

const SignUp = ({
  languages,
  handleSignUp,
  isSubmitting,
  serverErrors = [],
  notification,
}) => {
  const classes = useStyles();

  const friendlyServerErrors = fromPairs(map((error) => {
    return [error.name, error.reason];
  })(serverErrors));

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <img src="serko_logo.png" alt="Serko logo" className={classes.logo} />
        <Typography variant="body2">
          Sign up with Serko
        </Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmpassword: '',
            preferredLanguage: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            handleSignUp(values);
            actions.setSubmitting(false);
          }}
          render={({
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl} error>
                    <Field
                      name="email"
                      type="email"
                      label="Email"
                      disabled={isSubmitting}
                      component={TextField}
                      required
                    />
                    { friendlyServerErrors.email
                      && notification.visible
                      && <FormHelperText>{ friendlyServerErrors.email }</FormHelperText>
                    }
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl} error>
                    <Field
                      type="password"
                      name="password"
                      label="Password"
                      disabled={isSubmitting}
                      component={TextField}
                      required
                    />
                    { friendlyServerErrors.password
                      && notification.visible
                      && <FormHelperText>{ friendlyServerErrors.password }</FormHelperText>
                    }
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl} error>
                    <Field
                      type="password"
                      label="Confirm Password"
                      name="confirmpassword"
                      disabled={isSubmitting}
                      component={TextField}
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl} error>
                    <Field
                      type="text"
                      name="preferredLanguage"
                      label="Preferred Language"
                      select
                      helperText="Select your preferred language"
                      disabled={isSubmitting}
                      component={TextField}
                      required
                    >
                      { languages.length
                        ? (
                          map(language => (
                            <MenuItem
                              value={language.value}
                              key={language.label}
                            >
                              {language.label}
                            </MenuItem>
                          ))(languages)
                        ) : (
                          <MenuItem>
                            <div className={classes.menuSpinnerContainer}>
                              <CircularProgress className={classes.progress} size={24} />
                            </div>
                          </MenuItem>
                        )}
                    </Field>
                    { friendlyServerErrors.preferredLanguage
                      && notification.visible
                      && <FormHelperText>{ friendlyServerErrors.preferredLanguage }</FormHelperText>
                    }
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    className={classes.submit}
                  >
                    {isSubmitting ? (
                      <CircularProgress className={classes.progress} size={24} />
                    ) : (
                      'Sign Up'
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )
          }
        />
      </Paper>
      <Typography variant="body2" color="textSecondary" align="center" className={classes.poweredBy}>
        {'Powered by '}
        <Link color="inherit" href="https://www.serko.com/" target="_blank">
          Serko
        </Link>
      </Typography>
    </Container>
  );
};

SignUp.defaultProps = {
  languages: [],
  handleSignUp: null,
  isSubmitting: false,
  serverErrors: [],
  notification: {},
};

SignUp.propTypes = {
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  handleSignUp: PropTypes.func,
  isSubmitting: PropTypes.bool,
  serverErrors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      reason: PropTypes.string,
    }),
  ),
  notification: PropTypes.shape({
    visibile: PropTypes.bool,
    type: PropTypes.string,
    message: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  languages: selectors.getLanguages(state),
  signingUp: selectors.getSigningUp(state),
  isSubmitting: selectors.getIsSubmitting(state),
  serverErrors: selectors.getServerErrors(state),
  notification: selectors.getNotification(state),
});

const mapDispachToProps = dispatch => ({
  handleSignUp: formValues => dispatch({
    type: actionTypes.SIGN_UP,
    values: formValues,
  }),
});

export default connect(
  mapStateToProps,
  mapDispachToProps,
)(SignUp);
