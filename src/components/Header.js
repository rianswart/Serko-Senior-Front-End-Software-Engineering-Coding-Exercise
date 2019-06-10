import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  logo: {
    width: '50px',
    margin: '10px',
  },
  subTitle: {
    color: grey[600],
    margin: theme.spacing(0, 0, 5),
  },
}));

const Header = (props) => {
  const classes = useStyles();

  return (
    <>
      <img src="SerkoLogo.svg" alt="Serko logo" className={classes.logo} />
      <Typography className={classes.subTitle}>
        { props.subtitle }
      </Typography>
    </>
  );
};

Header.defaultProps = {
  subtitle: '',
};

Header.propTypes = {
  subtitle: PropTypes.string,
};

export default Header;
