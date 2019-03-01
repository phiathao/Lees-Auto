import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Styles from '../Styles/Styles';

import ManageDrawer from './Drawer/ManageDrawer';

class Manage extends React.Component {
  componentDidMount = () => {
    this.props.dispatch({
      type: 'FETCH_DATA'
    })
    this.props.dispatch({
      type: 'SET_HEADER',
      payload: { value: 5 },
    })
  }
  render() {
    return <ManageDrawer />
  }
};

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(withStyles(Styles)(Manage));
