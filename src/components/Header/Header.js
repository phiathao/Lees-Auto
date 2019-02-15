import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';


class Header extends React.Component {

  handleChange = (event, value) => {
    this.props.dispatch({
      type: 'SET_HEADER',
      payload: { value }
    })
    // this.setState({ value });
  };

  render() {
    const { value } = this.props.header
    return (
      <AppBar position='static'>
          <Typography variant="h2" align="center">Lee's Auto</Typography>
          <Tabs value={value} onChange={this.handleChange} fullWidth>
            <Tab label="Home" component={Link} to='home'/>
            <Tab label="Services" component={Link} to='services'/>
            <Tab label="Car List" component={Link} to='carList'/>
            {this.props.user.id && (
              <>
            <Tab label="Manage" component={Link} to='manage'/>
            <Tab label="Shop Service" component={Link} to='shopService'/>
            <Tab label="Car Sales" component={Link} to='carSales'/>
            </>
            )}
            {this.props.user.id ?
            <Tab label="Logout" component={LogOutButton}/>
            :
            <Tab label="Login" component={Link} to='login'/>
            }
          </Tabs>
      </AppBar>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  header: state.header,
});

export default connect(mapStateToProps)(Header);
