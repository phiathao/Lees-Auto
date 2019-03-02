import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Styles from '../../Styles/Styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import ServiceAdd from './ServiceAdd';
import ServiceSubtract from './ServiceSubtract';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddReceipt extends React.Component {
  state = ({
    numberService: -5 || 1
  })
  componentDidMount = () => {
    this.props.dispatch({ type: 'FETCH_SERVICES' });
  }
  handleSubmit = () => {
    if (this.props.reduxState.newVehicle.make !== '' && this.props.reduxState.newVehicle.year !== '' && this.props.reduxState.newVehicle.model !== '') { // validate input
      if (window.confirm(`Add ${this.props.reduxState.newVehicle.make} ${this.props.reduxState.newVehicle.model} to ${this.props.reduxState.viewCustomer.first_name}`)) {
        this.props.dispatch({
          type: 'ADD_VEHICLE',
          payload: this.props.reduxState.newVehicle
        }); // add some type of confirmation or notification that customer is added
        alert(`Vehicle added to ${this.props.reduxState.viewCustomer.first_name}`);
        this.props.history.push('/manage/customer');
      }
    } else {
      alert('not a valid vehicle');
    }
  }
  handleChange = (propertyName) => (event) => {
    if (propertyName === 'year') { // change to year format
      this.props.dispatch({
        type: 'SET_NEW_VEHICLE',
        payload: { ...this.props.reduxState.newVehicle, [propertyName]: `1-1-${event.target.value}` }
      })
    } else {
      this.props.dispatch({
        type: 'SET_NEW_VEHICLE',
        payload: { ...this.props.reduxState.newVehicle, [propertyName]: event.target.value }
      })
    }
  }
  handleAddService = () => {
    this.setState({
      numberService: this.state.numberService + 1
    })
  }
  handleSubtractService = () => {
    this.setState({
      numberService: this.state.numberService - 1
    })
  }
  // handleFill remove after demo
  handleFill = () => {
    this.props.dispatch({
      type: 'SET_NEW_VEHICLE',
      payload: {
        ...this.props.reduxState.newVehicle,
        make: 'Ford',
        model: 'F-150',
        year: '2011',
        plate: 'NIJU-RE91',
        color: 'White',
        other: 'custom hood paint'
      }
    })
  } // remove after demo
  render() {
    let inputService = [];
    if (this.state.numberService < 1) {
      this.setState({
        numberService: 1
      })
    }
    for (let i = 0; i < this.state.numberService; i++) {
      if (i === 0) {
        inputService.push(<ServiceAdd key={i} add={this.handleAddService} />)
      } else {
        inputService.push(<ServiceSubtract key={i} subtract={this.handleSubtractService} />)
      }
    }
    const { classes } = this.props
    return (
      <Dialog
        maxWidth='lg'
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle align="center">New Vehicle
        </DialogTitle>
        <DialogContent
          className={classes.dialogComponent}
        >
          <Grid container>
            <Grid item>
              {inputService}
              <Grid item>
                <TextField
                  label="Description"
                  type="text"
                  
                  margin="normal"
                  variant="filled"
                  onChange={this.handleChange('year')}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Amount Due"
                  type="text"
                  
                  margin="normal"
                  variant="filled"
                  onChange={this.handleChange('color')}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Payment Method"
                  type="text"
                  
                  margin="normal"
                  variant="filled"
                  onChange={this.handleChange('other')}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary"  onClick={this.handleSubmit}>Submit</Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(withStyles(Styles)(AddReceipt));
