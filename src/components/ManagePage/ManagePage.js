import React from 'react';
import './ManagePage.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';


const mapStateToProps = reduxState => ({
  reduxState, 
});

class Manage extends React.Component {
  componentDidMount(){
    this.props.dispatch({
      type: 'FETCH_DATA'
  })
  }
  render() {
    return (
      <div>
        <div className='component-header'>
          <h3>Manage Customers and Vehicles</h3>
          <Button variant='contained' color='secondary'>Add Customer</Button>
          <TextField
            id="filled-search"
            label="Search field"
            type="search"
            className='search-field'
            margin="normal"
            variant="filled"
          />
        </div>
        <p>
          Info Page
    </p>
      </div>
    )
  }
};

export default connect(mapStateToProps)(Manage);
