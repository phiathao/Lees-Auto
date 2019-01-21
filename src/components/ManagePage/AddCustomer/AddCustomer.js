import React from 'react';
import Button from '@material-ui/core/Button';
import '../ManagePage.css';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import Styles from '../../Styles/Styles';


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
  // handleFill remove after demo
  handleFill = () => {
    this.props.dispatch({
      type: 'SET_NEW_CUSTOMER',
      payload: { ...this.props.reduxState.newCustomer,
        first_name: 'John',
        last_name: 'Three',
        phone: '9204497000',
        street: '1332 N 15th St',
        city: 'Sheboygan',
        zip: '53081',
        state: 'WI'
      }
    })
  } // remove after demo
  render() {
    return (
      <Grid container spacing={24} className={this.props.classes.componentContainer}>
        <Grid item xs={12} className={this.props.classes.componentHeader}>
          <Button variant="contained" color="secondary" className={this.props.classes.headerButtonLeft} component={Link} to="/manage">Back to Manage</Button>
          <h3>Add Customer</h3>
        </Grid>
        <Grid item container xs={12} spacing={24} className={this.props.classes.boxFormContainer}>
        <Grid item xs={12} className={this.props.classes.boxFormMaxWidth}>
            <TextField
              label="First Name"
              type="search"
              className={this.props.classes.boxFormTwo}
              margin="normal"
              variant="filled"
              value={this.props.reduxState.newCustomer.first_name}
              onChange={this.handleChange('first_name')}
            />
            <TextField
              label="Last Name"
              type="search"
              className={this.props.classes.boxFormTwo}
              margin="normal"
              variant="filled"
              value={this.props.reduxState.newCustomer.last_name}
              onChange={this.handleChange('last_name')}
            />
          </Grid>
          <Grid item xs={12} className={this.props.classes.boxFormMaxWidth}>
            <TextField
              label="Phone Number"
              type="search"
              className={this.props.classes.boxFormOne}
              margin="normal"
              variant="filled"
              value={this.props.reduxState.newCustomer.phone}
              onChange={this.handleChange('phone')}
              inputProps={{
                maxLength: 10,
              }}
            />
          </Grid>
          <Grid item xs={12} className={this.props.classes.boxFormMaxWidth}>
            <TextField
              label="Street Address"
              type="search"
              className={this.props.classes.boxFormOne}
              margin="normal"
              variant="filled"
              value={this.props.reduxState.newCustomer.street}
              onChange={this.handleChange('street')}
            />
          </Grid>
          <Grid item xs={12} className={this.props.classes.boxFormMaxWidth}>
            <TextField
              label="City"
              type="search"
              className={this.props.classes.boxFormThreeFive}
              margin="normal"
              variant="filled"
              value={this.props.reduxState.newCustomer.city}
              onChange={this.handleChange('city')}
            />
            <TextField
              label="Zip Code"
              type="text"
              className={this.props.classes.boxFormTwoFive}
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
              className={this.props.classes.boxFormOneFive}
              margin="normal"
              variant="filled"
              value={this.props.reduxState.newCustomer.state}
              onChange={this.handleChange('state')}
              inputProps={{
                maxLength: 2,
              }}
            />
          </Grid>
          <Grid item xs={12} className={this.props.classes.boxFormMaxWidth}>
            <Button variant="contained" color="secondary" className={this.props.classes.boxFormOne} onClick={this.handleSubmit}>Submit</Button>
            <button className={this.props.classes.emptyButton} onClick={this.handleFill}>FILL</button>
            {/* button remove after demo */}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(withStyles(Styles)(AddCustomer));
