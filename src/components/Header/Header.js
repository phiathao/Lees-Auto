import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import LoginButton from '../LoginButton/LoginButton';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Link to="/home" className="header-title">
          <h2>Lee's Auto Shop &amp; Repair</h2>
        </Link>
        <Link className="nav-link" to="/home">
          Home
        </Link>
        {/* Always show this link since the about page is not protected */}
        <Link className="nav-link" to="/about">
          About
        </Link>
        <Link className="nav-link" to="/carList">
          Car List
        </Link>
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {this.props.user.id && (
          <>
            <Link className="nav-link" to="/manage">
              Manage
            </Link>
            <Link className="nav-link" to="/shopService">
              Shop Services
            </Link>
            <Link className="nav-link" to="/carSales">
              Car Sales
            </Link>
          </>
        )}
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
          {this.props.user.id ? <LogOutButton className="float-right nav-link" /> : <LoginButton className="float-right nav-link" />}
          {this.props.user.id && (
          <span className="float-right nav-login">Welcome back, {this.props.user.username}!
          </span>
        )}
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
