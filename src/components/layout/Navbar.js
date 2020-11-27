import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostPost from '../post/PostPost';
import Notifications from './Notifications';
import TextField from '@material-ui/core/TextField';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SearchField from './SearchField'
// Icons
import HomeIcon from '@material-ui/icons/Home';

class Navbar extends Component {
  render() {
    // console.log(this.props)
    const { authenticated } = this.props;
    return (
      <AppBar elevation={0}>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
            <SearchField></SearchField>
              <PostPost />
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  // posts : state.posts
});

export default connect(mapStateToProps)(Navbar);
