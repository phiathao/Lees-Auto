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
  render() {
    return (
      <div>
        <div className="customer-add-header">
          <Button variant="contained" color="secondary" className="button-return-left" component={Link} to="/manage">Back to Manage</Button>
          <h3>Add Customer</h3>
        </div>
        <div className="whole-box-form">
          <div className="name-box-form">
          <TextField
            id="filled-search"
            label="First"
            type="search"
            className='1-2-line'
            margin="normal"
            variant="filled"
          />
          <TextField
            id="filled-search"
            label="Last"
            type="search"
            className='1-2-line'
            margin="normal"
            variant="filled"
          />
          </div>
          <div className="name-box-form">
          <TextField
            id="filled-search"
            label="Phone"
            type="search"
            className='whole-line'
            margin="normal"
            variant="filled"
          />
          </div>
          <div className="address-box-form-line-1">
          <TextField
            id="filled-search"
            label="Street"
            type="search"
            className='whole-line'
            margin="normal"
            variant="filled"
          />
          </div>
          <div className="address-box-form-line-2">
          <TextField
            id="filled-search"
            label="City"
            type="search"
            className='6-10-line'
            margin="normal"
            variant="filled"
          />
          <TextField
            id="filled-search"
            label="Zip Code"
            type="search"
            className='3-10-line'
            margin="normal"
            variant="filled"
          />
          <TextField
            id="filled-search"
            label="State"
            type="search"
            className='1-10-line'
            margin="normal"
            variant="filled"
          />
          </div>
        </div>
      </div>
    )
  }
}

export default AddCustomer;
