import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import Styles from '../../Styles/Styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class AddCustomer extends React.Component {
  handleSubmit = () => {
    if (this.props.reduxState.newCustomer.first_name !== '') {
      this.props.dispatch({
        type: 'ADD_CUSTOMER',
        payload: this.props.reduxState.newCustomer
      }); // add some type of confirmation or notification that customer is added
      alert(this.props.reduxState.newCustomer.first_name + ' added');
      this.props.history.push('/manage');
    } else {
      alert('not a valid customer');
    }
  }
  handleChange = (propertyName) => (event) => {
    if (propertyName === 'state') {
      this.props.dispatch({
        type: 'SET_NEW_CUSTOMER',
        payload: { ...this.props.reduxState.newCustomer, [propertyName]: event.target.value.toUpperCase() }
      })
    } else {
      this.props.dispatch({
        type: 'SET_NEW_CUSTOMER',
        payload: { ...this.props.reduxState.newCustomer, [propertyName]: event.target.value }
      })
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        maxWidth='lg'
        open={this.props.open}
        // className={classes.dialogComponent}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle align="center">New Customer
        </DialogTitle>
        <DialogContent
          className={classes.dialogComponent}
        >
          <Grid container className={this.props.classes.componentContainer}>
            <Grid item className={this.props.classes.boxFormContainer}>
              <Grid item xs className={this.props.classes.boxFormMaxWidth}>
                <TextField
                  label="First Name"
                  type="search"
                  margin="normal"
                  variant="filled"
                  className={classes.dialog50}
                  value={this.props.reduxState.newCustomer.first_name}
                  onChange={this.handleChange('first_name')}
                />
                <TextField
                  label="Last Name"
                  type="search"
                  margin="normal"
                  variant="filled"
                  value={this.props.reduxState.newCustomer.last_name}
                  onChange={this.handleChange('last_name')}
                />
              </Grid>
              <Grid item xs className={this.props.classes.boxFormMaxWidth}>
                <TextField
                  label="Phone Number"
                  type="search"
                  margin="normal"
                  variant="filled"
                  value={this.props.reduxState.newCustomer.phone}
                  onChange={this.handleChange('phone')}
                  inputProps={{
                    maxLength: 10,
                  }}
                />
              </Grid>
              <Grid item xs className={this.props.classes.boxFormMaxWidth}>
                <TextField
                  label="Street Address"
                  type="search"
                  margin="normal"
                  variant="filled"
                  value={this.props.reduxState.newCustomer.street}
                  onChange={this.handleChange('street')}
                />
              </Grid>
              <Grid item xs className={this.props.classes.boxFormMaxWidth}>
                <TextField
                  label="City"
                  type="search"
                  margin="normal"
                  variant="filled"
                  value={this.props.reduxState.newCustomer.city}
                  onChange={this.handleChange('city')}
                />
                <TextField
                  label="Zip Code"
                  type="text"
                  margin="normal"
                  variant="filled"
                  value={this.props.reduxState.newCustomer.zip}
                  onChange={this.handleChange('zip')}
                  inputProps={{
                    maxLength: 5,
                  }}
                />
                <TextField
                  label="State"
                  type="text"
                  margin="normal"
                  variant="filled"
                  value={this.props.reduxState.newCustomer.state}
                  onChange={this.handleChange('state')}
                  inputProps={{
                    maxLength: 2,
                  }}
                />
              </Grid>
              <Grid item xs className={this.props.classes.boxFormMaxWidth}>
                <Button variant="contained" color="secondary" onClick={this.handleSubmit}>Submit</Button>
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

export default connect(mapStateToProps)(withStyles(Styles)(AddCustomer));
