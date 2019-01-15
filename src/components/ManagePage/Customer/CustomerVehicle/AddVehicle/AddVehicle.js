import React from 'react';
import Button from '@material-ui/core/Button';
// import '../ManagePage.css';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Styles from '../../../../Styles/Styles';
import Grid from '@material-ui/core/Grid';

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
      <Grid container spacing={24} className={this.props.classes.componentContainer}>
        <Grid item xs={12} className={this.props.classes.componentHeader}>
          <Button variant="contained" color="secondary" className={this.props.classes.headerButtonLeft} component={Link} to="/manage/customer">Back to Customer</Button>
          <h3>Add Vehicle</h3>
        </Grid>
        <Grid item container xs={12} spacing={24} className={this.props.classes.boxFormContainer}>
          <Grid item xs={12} className={this.props.classes.boxFormMaxWidth}>
            <TextField
              label="Make"
              type="text"
              className={this.props.classes.boxFormTwo}
              margin="normal"
              variant="filled"
              onChange={this.handleChange('make')}
            />
            <TextField
              label="Model"
              type="text"
              className={this.props.classes.boxFormTwo}
              margin="normal"
              variant="filled"
              onChange={this.handleChange('model')}
            />
          </Grid>
          <Grid item xs={12} className={this.props.classes.boxFormMaxWidth}>
            <TextField
              label="Year"
              type="text"
              className={this.props.classes.boxFormOne}
              margin="normal"
              variant="filled"
              onChange={this.handleChange('year')}
            />
          </Grid>
          <Grid item xs={12} className={this.props.classes.boxFormMaxWidth}>
            <TextField
              label="Plate"
              type="text"
              className={this.props.classes.boxFormTwo}
              margin="normal"
              variant="filled"
              onChange={this.handleChange('plate')}
            />
            <TextField
              label="Color"
              type="text"
              className={this.props.classes.boxFormTwo}
              margin="normal"
              variant="filled"
              onChange={this.handleChange('color')}
            />
          </Grid>
          <Grid item xs={12} className={this.props.classes.boxFormMaxWidth}>
            <TextField
              label="Other"
              type="text"
              className={this.props.classes.boxFormOne}
              margin="normal"
              variant="filled"
              onChange={this.handleChange('other')}
            />
          </Grid>
          <Grid item xs={12} className={this.props.classes.boxFormMaxWidth}>
            <Button variant="contained" color="secondary" className={this.props.classes.boxFormOne} onClick={this.handleSubmit}>Submit</Button>
          </Grid>
        </Grid>
      </Grid>
      :
      <Grid className="component-header">
        <Button variant="contained" color="secondary" className="button-return-left" component={Link} to="/manage">Back to Manage</Button>
        <h3>No Customer Selected to Add Vehicle</h3>
      </Grid>
      ;
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(withStyles(Styles)(AddVehicle));
