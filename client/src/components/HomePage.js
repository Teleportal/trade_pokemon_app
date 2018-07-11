import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }

};

function HomePage(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            <Link className={classes.link} to='/homePage'>Trade Pokemon</Link>
          </Typography>
          <Button color="inherit">
            <Link className={classes.link} to='/trade'>Trade</Link>
          </Button>
          <Button color="inherit">
            <Link className={classes.link} to='/login'>Login</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

HomePage.propTypes = {
  // classes: PropTypes.shape({
  classes: PropTypes.object.isRequired
  // }).isRequired
};

export default withStyles(styles)(HomePage);