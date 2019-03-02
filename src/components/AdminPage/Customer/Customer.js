import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Vehicle from './CustomerVehicle/Vehicle';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Styles from '../../Styles/Styles';

class Customer extends React.Component {
    state = {
        edit: false
    }
    componentDidMount = () => {
        this.props.dispatch({
            type: 'FETCH_DATA_CUSTOMER',
            payload: this.props.match.params.id
        })
    }
    handleEdit = () => {
        this.setState({
            edit: true
        })
    }
    handleCancel = () => {
        this.setState({
            edit: false
        })
        this.props.dispatch({
            type: 'FETCH_DATA_CUSTOMER',
            payload: this.props.match.params.id
        })
    }
    handleSubmit = () => {
        this.props.dispatch({
            type: 'UPDATE_CUSTOMER',
            payload: this.props.reduxState.viewCustomer
        })
        this.setState({
            edit: false
        })
    }
    handleChange = (propertyName) => (event) => {
        this.props.dispatch({
            type: 'EDIT_CUSTOMER',
            payload: { ...this.props.reduxState.viewCustomer, [propertyName]: event.target.value }
        })
    }
    handleAddVehicle = (id) => {
        this.props.dispatch({
            type: 'SET_NEW_VEHICLE',
            payload: { ...this.props.reduxState.newVehicle, customer_id: id }
        });
        this.props.history.push('/manage/vehicle/add');
    }
    render() {
        let editMode = this.state.edit ?
            // in edit
            <Grid item container spacing={24}>
                <Grid item container spacing={24}>
                    <Grid item xs={9}>
                        <h4>Name: <input value={this.props.reduxState.viewCustomer.first_name} onChange={this.handleChange('first_name')} /> <input value={this.props.reduxState.viewCustomer.last_name} onChange={this.handleChange('last_name')} /></h4>
                        <h4>Phone: <input value={this.props.reduxState.viewCustomer.phone} onChange={this.handleChange('phone')} /></h4>
                        <h4>Address: <input value={this.props.reduxState.viewCustomer.street} onChange={this.handleChange('street')} /> <input value={this.props.reduxState.viewCustomer.city} onChange={this.handleChange('city')} /> <input value={this.props.reduxState.viewCustomer.zip} onChange={this.handleChange('zip')} /> <input value={this.props.reduxState.viewCustomer.state} onChange={this.handleChange('state')} /></h4>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="secondary" onClick={this.handleSubmit}>Save</Button>
                        <Button variant="contained" color="secondary" onClick={this.handleCancel}>Cancel</Button>
                    </Grid>
                </Grid>
            </Grid>
            : // not in edit
            <Grid item container spacing={24}>
                <Grid item container spacing={24}>
                    <Grid item xs={9}>
                        <h4>Name: {this.props.reduxState.viewCustomer.first_name} {this.props.reduxState.viewCustomer.last_name}</h4>
                        <h4>Phone: {this.props.reduxState.viewCustomer.phone}</h4>
                        <h4>Address: {this.props.reduxState.viewCustomer.street} {this.props.reduxState.viewCustomer.city} {this.props.reduxState.viewCustomer.zip} {this.props.reduxState.viewCustomer.state}</h4>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="secondary" onClick={this.handleEdit}>Edit</Button>
                    </Grid>
                </Grid>
            </Grid>;
        let customerVehicles = this.props.reduxState.customerVehicles.map(vehicle => {
            return <Vehicle vehicle={vehicle} key={vehicle.id} />
        });
        const { classes } = this.props;
        return this.props.reduxState.viewCustomer ?
            <Grid container spacing={24} className={classes.componentGrid}>
                <Grid item xs={12} >
                    <Button variant="contained" color="secondary" component={Link} to="/manage">Back</Button>
                    <h3>View Customer</h3>
                </Grid>
                {editMode}
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={() => this.handleAddVehicle(this.props.reduxState.viewCustomer.id)}>Add Vehicle</Button>
                </Grid>
                <Grid item xs={12}>
                    {customerVehicles}
                </Grid>
            </Grid>
            :
            <Grid container spacing={24} className={classes.componentGrid}>
                <Grid item xs={12} >
                    <Button variant="contained" color="secondary" component={Link} to="/manage">Back</Button>
                    <h3>No customer selected</h3>
                </Grid>
            </Grid>
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(Styles)(Customer));