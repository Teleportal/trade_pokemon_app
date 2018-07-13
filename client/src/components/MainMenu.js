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

function MainMenu(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          
          <Link className={classes.link} to='/homePage'>
            <Typography variant="title" color="inherit" className={classes.flex}>Trade Pokemon</Typography>
          </Link>
          
          <Link className={classes.link} to='/trade'>
            <Button color="inherit">
              Trade
            </Button>
          </Link>

          <Link className={classes.link} to='/login'>
            <Button color="inherit">
              Login
            </Button>
          </Link>

        </Toolbar>
      </AppBar>
    </div>
  );
}

MainMenu.propTypes = {
  // classes: PropTypes.shape({
  classes: PropTypes.object.isRequired
  // }).isRequired
};

export default withStyles(styles)(MainMenu);