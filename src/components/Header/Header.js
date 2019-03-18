import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import LogOutButton from '../LogOutButton/LogOutButton';

class Header extends React.Component {

  handleChange = (event, value) => {
    this.props.dispatch({
      type: "SET_HEADER",
      payload: { value }
    })
    console.log(this.props.header)
    // this.setState({ value });
  };

  render() {
    const { value } = this.props.header;
    const { classes } = this.props;
    return (
      (this.props.info !== 4 || this.props.user.id) ? (<AppBar position={!this.props.user.id ? "static" : "fixed"} className={classes.appBar}>
        {!this.props.user.id && <Typography variant="h2" style={{ color: "white" }} align="center">Lee's Auto</Typography>}
        {!this.props.user.id ?
          <Tabs
            value={value}
            onChange={this.handleChange}
            variant="fullWidth"
            centered
          >
            <Tab className={classes.appTab} label="Home" component={Link} to="/home" />
            <Tab className={classes.appTab} label="Services" component={Link} to="/services" />
            <Tab className={classes.appTab} label="Car List" component={Link} to="/carList" />
            <Tab className={classes.appTab} label="About Us" component={Link} to="/about" />
            <Tab className={classes.appTab} label="Contact" component={Link} to="/contact" />
          </Tabs>
          :
          <Tabs
            value={value}
            onChange={this.handleChange}
            variant="fullWidth"
            centered
          >
            <Tab className={classes.appTab} label="Home" component={Link} to="/home" />
            <Tab className={classes.appTab} label="Services" component={Link} to="/services" />
            <Tab className={classes.appTab} label="Car List" component={Link} to="/carList" />
            <Tab className={classes.appTab} label="About Us" component={Link} to="/about" />
            <Tab className={classes.appTab} label="Contact" component={Link} to="/contact" />
            <Tab className={classes.appTab} label="Manage" component={Link} to="/manage" />
            <Tab className={classes.appTab} label="Logout" component={LogOutButton} />
          </Tabs>
        }
      </AppBar>)
      : <></>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  header: state.header,
  info: state.infoView
});

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appTab: {
    minWidth: 'auto',
  },
});

export default connect(mapStateToProps)(withStyles(styles)(Header));
