import React from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

import Service from './Service';

class AddReceipt extends React.Component {
  state = ({
    numberService: -5 || 1,
  })
  componentDidMount = () => {
    this.props.dispatch({ type: 'FETCH_SERVICES' });
  }
  handleSubmit = () => {

  }
  handleChange = (propertyName) => (event) => {
    this.props.dispatch({
      type: 'SET_NEW_RECEIPT',
      payload: { ...this.props.reduxState.newReceipt, [propertyName]: event.target.value }
    });
  }
  handleVehicleChange = (event) => {
    this.props.dispatch({
      type: 'SET_NEW_RECEIPT',
      payload: { ...this.props.reduxState.newReceipt, vehicle_id: event.target.value }
    });
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
  handleClose = () => {
    this.setState({
      numberService: 1
    });
    this.props.dispatch({
      type: 'CLEAR_NEW_VEHICLE',
    });
    this.props.handleClose();
  }
  render() {

    let inputService = [];
    if (this.state.numberService < 1) {
      this.setState({
        numberService: 1
      })
    }
    for (let i = 0; i < this.state.numberService; i++) {
      inputService.push(<Service key={i} add={this.handleAddService} />)
    }

    const { classes } = this.props
    return (
      <Dialog
        maxWidth='lg'
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle align="center">Add Receipt
        </DialogTitle>
        <DialogContent
          className={classes.dialogComponent}
        >
          <Grid container spacing={8}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                select
                label="Vehicle"
                type="text"
                value={this.props.reduxState.newReceipt.vehicle_id || this.props.reduxState.vehiclesData[0].vehicle_id}
                className={classes.dialogTextField}
                margin="normal"
                variant="outlined"
                onChange={this.handleVehicleChange}
              >
                {this.props.reduxState.vehiclesData.map(vehicle => {
                  return <MenuItem key={vehicle.vehicle_id} value={vehicle.vehicle_id}>{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.plate}</MenuItem>
                })}
              </TextField>
            </Grid>
            <Grid item xs={12} className={classes.overflowScroll}>
              {inputService}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  type="text"
                  margin="normal"
                  variant="outlined"
                  className={classes.dialogTextField}
                  onChange={this.handleChange('description')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amount Due"
                  type="text"
                  margin="normal"
                  variant="outlined"
                  className={classes.dialogTextField}
                  onChange={this.handleChange('due')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Payment Method"
                  type="text"
                  margin="normal"
                  variant="outlined"
                  className={classes.dialogTextField}
                  onChange={this.handleChange('payment_method')}
                />
              </Grid>
            </Grid>
            <Grid item xs={3} sm={3}>
              <Tooltip title="Add Service" placement="right">
                <AddIcon
                  fontSize="large"
                  onClick={this.handleAddService}
                  color="secondary"
                />
              </Tooltip>
            </Grid>
            <Grid item xs={3} sm={3}>
              <Tooltip title="Remove Service" placement="right">
                <RemoveIcon
                  fontSize="large"
                  onClick={this.handleSubtractService}
                  color="secondary"
                />
              </Tooltip>
            </Grid>
            <Grid item xs={3} sm={3} style={{ direction: 'rtl', }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleClose}
                fullWidth
              >Cancel</Button>
            </Grid>
            <Grid item xs={3} sm={3} style={{ direction: 'rtl', }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleSubmit}
                fullWidth
              >Submit</Button>
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
  dialogTextField: {
    marginTop: theme.spacing.unit - 3,
    marginBottom: theme.spacing.unit - 8,
  },
  dialogComponent: {
    flexGrow: 1,
    maxWidth: 700,
  },
  overflowScroll: {
    overflow: 'scroll',
    maxHeight: theme.spacing.unit * 50,
  },
});

export default connect(mapStateToProps)(withStyles(styles)(AddReceipt));
