import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Styles from '../../Styles/Styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddVehicle extends React.Component {
  handleSubmit = () => {
    if (
      this.props.reduxState.newVehicle.make !== ''
      && this.props.reduxState.newVehicle.year !== ''
      && this.props.reduxState.newVehicle.model !== ''
    ) { // validate input
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
    this.props.dispatch({
      type: 'SET_NEW_VEHICLE',
      payload: { ...this.props.reduxState.newVehicle, [propertyName]: event.target.value }
    });
  }
  handleCustomerChange = (event) => {
    this.props.dispatch({
      type: 'SET_NEW_VEHICLE',
      payload: { ...this.props.reduxState.newVehicle, customer_id: event.target.value }
    });
  }

  render() {
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
          <Grid container spacing={8}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                select
                label="Customer"
                type="text"
                value={this.props.reduxState.newVehicle.customer_id}
                className={classes.dialogTextField}
                margin="normal"
                variant="outlined"
                onChange={this.handleCustomerChange}
              >
                {this.props.reduxState.customersData.map(customer => {
                  return <MenuItem key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</MenuItem>
                })}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Make"
                type="text"
                margin="normal"
                variant="outlined"
                className={classes.dialogTextField}
                value={this.props.reduxState.newVehicle.make}
                onChange={this.handleChange('make')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Model"
                type="text"
                margin="normal"
                variant="outlined"
                className={classes.dialogTextField}
                value={this.props.reduxState.newVehicle.model}
                onChange={this.handleChange('model')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year"
                type="text"
                margin="normal"
                variant="outlined"
                className={classes.dialogTextField}
                value={this.props.reduxState.newVehicle.year}
                onChange={this.handleChange('year')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Plate"
                type="text"
                margin="normal"
                variant="outlined"
                className={classes.dialogTextField}
                value={this.props.reduxState.newVehicle.plate}
                onChange={this.handleChange('plate')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Color"
                type="text"
                margin="normal"
                variant="outlined"
                className={classes.dialogTextField}
                value={this.props.reduxState.newVehicle.color}
                onChange={this.handleChange('color')}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Other"
                multiline
                rows={3}
                type="text"
                margin="normal"
                variant="outlined"
                className={classes.dialogTextField}
                value={this.props.reduxState.newVehicle.other}
                onChange={this.handleChange('other')}
              />
            </Grid>
            <Grid item xs={12} sm={12} style={{ direction: 'rtl', }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleSubmit}
              >Submit</Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.props.handleClose}
                className={classes.cancelMargin}
              >Cancel</Button>
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

export default connect(mapStateToProps)(withStyles(Styles)(AddVehicle));
