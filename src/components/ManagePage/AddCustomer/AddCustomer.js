import React from 'react';
import Button from '@material-ui/core/Button';
import './AddCustomer.css';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class AddCustomer extends React.Component {
  state = ({
    
  })
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
            id="filled-search"
            label="First Name"
            type="search"
            className='name-form'
            margin="normal"
            variant="filled"
          />
          <TextField
            id="filled-search"
            label="Last Name"
            type="search"
            className='name-form'
            margin="normal"
            variant="filled"
          />
          </div>
          <div className="box-form">
          <TextField
            id="filled-search"
            label="Phone Number"
            type="search"
            className='whole-line'
            margin="normal"
            variant="filled"
          />
          </div>
          <div className="box-form">
          <TextField
            id="filled-search"
            label="Street Address"
            type="search"
            className='whole-line'
            margin="normal"
            variant="filled"
          />
          </div>
          <div className="box-form">
          <TextField
            id="filled-search"
            label="City"
            type="search"
            className='address-city'
            margin="normal"
            variant="filled"
          />
          <TextField
            id="filled-search"
            label="Zip Code"
            type="search"
            className='address-zip'
            margin="normal"
            variant="filled"
          />
          <TextField
            id="filled-search"
            label="State"
            type="search"
            className='address-state'
            margin="normal"
            variant="filled"
          />
          </div>
          <div className="box-form">
          <Button variant="contained" color="secondary" className="submit-btn">Submit</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default AddCustomer;
