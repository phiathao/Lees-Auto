import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Link to="/home" className="header-title">
          <h2>Lee's Auto Shop &amp; Repair</h2>
        </Link>
        <Link className="nav-link" to="/home">
          {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
          {this.props.user.id ? 'Home' : 'Login / Register'}
        </Link>
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {this.props.user.id && (
          <>
            <Link className="nav-link" to="/info">
              Info Page
          </Link>
            <LogOutButton className="nav-link" />
          </>
        )}
        {/* Always show this link since the about page is not protected */}
        <Link className="nav-link" to="/about">
          About
      </Link>
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Header);
