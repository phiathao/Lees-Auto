import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Styles from '../../Styles/Styles';
import Receipt from '../Customer/CustomerVehicle/VehicleReceipts/Receipts';

class VehicleReceipts extends React.Component {
    state = {
        edit: false
    }
    componentDidMount = () => {
        this.props.dispatch({
            type: 'FETCH_DATA_VEHICLE',
            payload: this.props.match.params.id
        });
    }
    handleEdit = () => {
        this.props.dispatch({
            type: 'FETCH_DATA_VEHICLE',
            payload: this.props.reduxState.viewVehicle.id
        });
        this.setState({
            edit: true
        });
    }
    handleCancel = () => {
        this.props.dispatch({
            type: 'FETCH_DATA_VEHICLE',
            payload: this.props.reduxState.viewVehicle.id
        });
        this.setState({
            edit: false
        });
    }
    handleChange = (propertyName) => (event) => {
        this.props.dispatch({
            type: 'EDIT_VEHICLE',
            payload: { ...this.props.reduxState.viewVehicle, [propertyName]: event.target.value }
        });
    }
    handleSubmit = () => {
        this.props.dispatch({
            type: 'UPDATE_VEHICLE',
            payload: this.props.reduxState.viewVehicle
        });
        this.setState({
            edit: false
        });
    }
    handleDelete = (vehicleId) => {
        if (window.confirm('Delete Vehicle?')) {
            this.props.dispatch({
                type: 'DELETE_VEHICLE',
                payload: vehicleId
            });
            this.props.dispatch({
                type: 'FETCH_DATA_CUSTOMER',
                payload: this.props.reduxState.viewVehicle.id
            });
        }
    }
    handleView = () => {
        this.props.dispatch({
            type: 'FETCH_DATA_VEHICLE',
            payload: this.props.reduxState.viewVehicle.id
        });
    }
    handleAddReceipt = (vehicleId) => {
        this.props.dispatch({
            type: 'SET_NEW_RECEIPT',
            payload: { ...this.props.reduxState.newReceipt, vehicle_id: vehicleId }
        });
        this.props.history.push('/manage/receipt/add');
    }
    render() {
        let editMode = this.state.edit ?
            // in edit
            <Grid item container spacing={24}>
                <Grid item container spacing={24}>
                    <Grid item xs={9}>
                        <h4>
                            Make:
                            <input value={this.props.reduxState.viewVehicle.make} onChange={this.handleChange('make')} />
                        </h4>
                        <h4>
                            Model:
                            <input value={this.props.reduxState.viewVehicle.model} onChange={this.handleChange('model')} />
                        </h4>
                        <h4>
                            Year:
                            <input value={this.props.reduxState.viewVehicle.year} onChange={this.handleChange('year')} />
                        </h4>
                        <h4>
                            Plate:
                            <input value={this.props.reduxState.viewVehicle.plate} onChange={this.handleChange('plate')} />
                        </h4>
                        <h4>
                            Color:
                            <input value={this.props.reduxState.viewVehicle.color} onChange={this.handleChange('color')} />
                        </h4>
                        <h4>
                            Other:
                            <input value={this.props.reduxState.viewVehicle.other} onChange={this.handleChange('other')} />
                        </h4>
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
                        <h4>
                            Make: {this.props.reduxState.viewVehicle.make}
                        </h4>
                        <h4>
                            Model: {this.props.reduxState.viewVehicle.model}
                        </h4>
                        <h4>
                            Year: {this.props.reduxState.viewVehicle.year}
                        </h4>
                        <h4>
                            Plate: {this.props.reduxState.viewVehicle.plate}
                        </h4>
                        <h4>
                            Color: {this.props.reduxState.viewVehicle.color}
                        </h4>
                        <h4>
                            Other: {this.props.reduxState.viewVehicle.other}
                        </h4>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="secondary" onClick={this.handleEdit}>Edit</Button>
                    </Grid>
                </Grid>
            </Grid>;
            let vehicleReceipts = this.props.reduxState.vehicleReceipts.map(receipt => {
                return <Receipt receipt={receipt} key={receipt.id} />
            });
            const { classes } = this.props
        return this.props.reduxState.viewVehicle.id ?
            <Grid container spacing={24} className={classes.componentGrid}>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" component={Link} to="/manage/customer">Back to Customer</Button>
                    <h3>View Vehicles</h3>
                </Grid>
                {editMode}
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={() => this.handleAddReceipt(this.props.reduxState.viewVehicle.id)}>Add Receipts</Button>
                </Grid>
                <Grid item xs={12}>
                    {vehicleReceipts}
                </Grid>
            </Grid>
            :
            <Grid container spacing={24} className={this.props.classes.componentContainer}>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" component={Link} to="/manage">Back to Manage</Button>
                    <h3>No vehicle selected</h3>
                </Grid>
            </Grid>;
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(Styles)(VehicleReceipts));
