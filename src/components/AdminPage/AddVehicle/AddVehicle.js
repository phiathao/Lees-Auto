import React from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddVehicle extends React.Component {
  componentDidUpdate(newProps) {
    if (newProps.reduxState.viewCustomer.id !== this.props.reduxState.viewCustomer.id) {
      this.props.dispatch({
        type: 'SET_NEW_VEHICLE',
        payload: { ...this.props.reduxState.newVehicle, customer_id: this.props.reduxState.viewCustomer.id }
      });
    }
  }
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
        this.props.handleClose(); // close dialog
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
  handleClose = () => {
    this.props.dispatch({
      type: 'CLEAR_NEW_VEHICLE',
    });
    this.props.handleClose()
  }
  render() {
    const { classes } = this.props
    return (
      <Dialog
        maxWidth='lg'
        open={this.props.open}
        onClose={this.handleClose}
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
                disabled
                label="Customer"
                type="text"
                value={`${this.props.reduxState.viewCustomer.first_name} ${this.props.reduxState.viewCustomer.last_name}`}
                className={classes.dialogTextField}
                margin="normal"
                variant="outlined"
              />
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Vin"
                type="text"
                margin="normal"
                variant="outlined"
                className={classes.dialogTextField}
                value={this.props.reduxState.newVehicle.vin}
                onChange={this.handleChange('vin')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Odometer"
                type="text"
                margin="normal"
                variant="outlined"
                className={classes.dialogTextField}
                value={this.props.reduxState.newVehicle.odometer}
                onChange={this.handleChange('odometer')}
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
                onClick={this.handleClose}
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

const styles = theme => ({
  cancelMargin: {
    marginRight: theme.spacing.unit,
  },
  dialogTextField: {
    marginTop: theme.spacing.unit - 3,
    marginBottom: theme.spacing.unit - 8,
  },
  dialogComponent: {
    flexGrow: 1,
    maxWidth: 700,
  },
});

export default connect(mapStateToProps)(withStyles(styles)(AddVehicle));
