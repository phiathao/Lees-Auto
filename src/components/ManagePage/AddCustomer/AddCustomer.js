import React from 'react';
import Button from '@material-ui/core/Button';
import './AddCustomer.css';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';



// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class AddCustomer extends React.Component {
  handleSubmit = () => {
    this.props.dispatch({
      type: 'ADD_CUSTOMER',
      payload: this.props.reduxState.newCustomer
    }) // add some type of confirmation or notification that customer is added
    this.props.history.push('/manage');
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
    return (
      <div>
        <div className="customer-add-header">
          <Button variant="contained" color="secondary" className="button-return-left" component={Link} to="/manage">Back to Manage</Button>
          <h3>Add Customer</h3>
        </div>
        <div className="add-customer-form">
          <div className="box-form">
            <TextField
              label="First Name"
              type="search"
              className="name-form"
              margin="normal"
              variant="filled"
              onChange={this.handleChange('first_name')}
            />
            <TextField
              label="Last Name"
              type="search"
              className="name-form"
              margin="normal"
              variant="filled"
              onChange={this.handleChange('last_name')}
            />
          </div>
          <div className="box-form">
            <TextField
              label="Phone Number"
              type="search"
              className="whole-line"
              margin="normal"
              variant="filled"
              onChange={this.handleChange('phone')}
              inputProps={{
                maxLength: 10,
              }}
            />
          </div>
          <div className="box-form">
            <TextField
              label="Street Address"
              type="search"
              className="whole-line"
              margin="normal"
              variant="filled"
              onChange={this.handleChange('street')}
            />
          </div>
          <div className="box-form">
            <TextField
              label="City"
              type="search"
              className="address-city"
              margin="normal"
              variant="filled"
              onChange={this.handleChange('city')}
            />
            <TextField
              label="Zip Code"
              type="text"
              className="address-zip"
              margin="normal"
              variant="filled"
              onChange={this.handleChange('zip')}
              inputProps={{
                maxLength: 5,
              }}
            />
            <TextField
              label="State"
              type="text"
              className="address-state"
              margin="normal"
              variant="filled"
              onChange={this.handleChange('state')}
              inputProps={{
                maxLength: 2,
              }}
            />
          </div>
          <div className="box-form">
            <Button variant="contained" color="secondary" className="submit-btn" onClick={this.handleSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(AddCustomer);
