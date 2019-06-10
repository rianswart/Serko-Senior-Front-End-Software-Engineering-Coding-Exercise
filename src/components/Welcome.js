import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
  button: {
    margin: theme.spacing(3, 0, 2),
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
}));

const Welcome = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <img src="serko_logo.png" alt="Serko logo" className={classes.logo} />
        <Typography variant="body2">
          Welcome to Serko&apos;s online booking and expense tool
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Get started
            </Button>
          </Grid>
        </Grid>
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

export default Welcome;
