import React from 'react';
import Button from '@material-ui/core/Button';
// import '../ManagePage.css';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

class AddVehicle extends React.Component {
  handleSubmit = () => {
    if (this.props.reduxState.newVehicle.make !== '' && this.props.reduxState.newVehicle.year !== '' && this.props.reduxState.newVehicle.model !== '') { // validate input
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
    if (propertyName === 'year') { // change to year format
      this.props.dispatch({
        type: 'SET_NEW_VEHICLE',
        payload: { ...this.props.reduxState.newVehicle, [propertyName]: `1-1-${event.target.value}` }
      })
    } else {
      this.props.dispatch({
        type: 'SET_NEW_VEHICLE',
        payload: { ...this.props.reduxState.newVehicle, [propertyName]: event.target.value }
      })
    }
  }
  render() {
    return this.props.reduxState.newVehicle.customer_id ?
      <div>
        <div className="component-header">
          <Button variant="contained" color="secondary" className="button-return-left" component={Link} to="/manage/customer">Back to Customer</Button>
          <h3>Add Vehicle</h3>
        </div>
        <div className="add-customer-form">
          <div className="box-form">
            <TextField
              label="Make"
              type="text"
              className="name-form"
              margin="normal"
              variant="filled"
              onChange={this.handleChange('make')}
            />
            <TextField
              label="Model"
              type="text"
              className="name-form"
              margin="normal"
              variant="filled"
              onChange={this.handleChange('model')}
            />
          </div>
          <div className="box-form">
            <TextField
              label="Year"
              type="text"
              className="whole-line"
              margin="normal"
              variant="filled"
              onChange={this.handleChange('year')}
            />
          </div>
          <div className="box-form">
            <TextField
              label="Plate"
              type="text"
              className="whole-line"
              margin="normal"
              variant="filled"
              onChange={this.handleChange('plate')}
            />
          </div>
          <div className="box-form">
            <TextField
              label="Color"
              type="text"
              className="address-city"
              margin="normal"
              variant="filled"
              onChange={this.handleChange('color')}
            />
            <TextField
              label="other"
              type="text"
              className="address-zip"
              margin="normal"
              variant="filled"
              onChange={this.handleChange('other')}
            />
          </div>
          <div className="box-form">
            <Button variant="contained" color="secondary" className="submit-btn" onClick={this.handleSubmit}>Submit</Button>
          </div>
        </div>
      </div>
      :
      <div className="component-header">
        <Button variant="contained" color="secondary" className="button-return-left" component={Link} to="/manage">Back to Manage</Button>
        <h3>No Customer Selected to Add Vehicle</h3>
      </div>
      ;
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(AddVehicle);
