import React from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


class AddReceipt extends React.Component {
  state = {
    open: false,
  };
  // ---- snackbar ----
  handleClickSnack = () => {
    this.setState({ open: true });
  };
  handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };
  // ---- end of snackbar ----
  componentDidUpdate(newProps) {
    if (newProps.reduxState.viewVehicle.vehicle_id !== this.props.reduxState.viewVehicle.vehicle_id) {
      this.props.dispatch({
        type: 'SET_NEW_RECEIPT',
        payload: { ...this.props.reduxState.newReceipt, vehicle_id: this.props.reduxState.viewVehicle.vehicle_id }
      });
    }
  }

  handleSubmit = () => {
    this.props.dispatch({
      type: 'ADD_RECEIPT',
      payload: this.props.reduxState.newReceipt
    })
    this.handleClickSnack();
    this.handleClose();
  }
  handleClose = () => {
    this.props.handleClose();
    setTimeout(()=>{
      this.props.dispatch({
        type: 'CLEAR_NEW_RECEIPT',
      });
    }, 6000)
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
        <DialogTitle align="center">Add Receipt
        </DialogTitle>
        <DialogContent
          className={classes.dialogComponent}
        >
          <Grid container spacing={8}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                disabled
                label="Vehicle"
                type="text"
                value={`${this.props.reduxState.viewVehicle.year} ${this.props.reduxState.viewVehicle.make} ${this.props.reduxState.viewVehicle.model} ${this.props.reduxState.viewVehicle.plate}`}
                className={classes.dialogTextField}
                margin="normal"
                variant="outlined"
              />
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
              >Add</Button>
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
