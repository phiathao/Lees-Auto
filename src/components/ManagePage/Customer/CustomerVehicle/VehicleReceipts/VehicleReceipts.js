import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Styles from '../../../../Styles/Styles';
import Receipt from './Receipts';

class VehicleReceipts extends React.Component {
    state = {
        edit: false
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
            payload: this.props.vehicle.id
        });
        this.props.history.push('/manage/receipts');
    }
    handleAddVehicle = (id) => {
        this.props.dispatch({
            type: 'SET_NEW_RECEIPT',
            payload: { ...this.props.reduxState.newReceipt, vehicle_id: this.props.reduxState.viewVehicle.id }
        });
        this.props.history.push('/manage/receipts/add');
    }
    render() {
        let editMode = this.state.edit ?
            // in edit
            <Grid item container spacing={24} className={this.props.classes.componentMaxWidth}>
                <Grid item container spacing={24} className={this.props.classes.stickLeft}>
                    <Grid item xs={9}>
                        <h4>
                            Make:
                            <input className={this.props.classes.inputMargin} value={this.props.reduxState.viewVehicle.make} onChange={this.handleChange('make')} />
                        </h4>
                        <h4>
                            Model:
                            <input className={this.props.classes.inputMargin} value={this.props.reduxState.viewVehicle.model} onChange={this.handleChange('model')} />
                        </h4>
                        <h4>
                            Year:
                            <input className={this.props.classes.inputMargin} value={this.props.reduxState.viewVehicle.year} onChange={this.handleChange('year')} />
                        </h4>
                        <h4>
                            Plate:
                            <input className={this.props.classes.inputMargin} value={this.props.reduxState.viewVehicle.plate} onChange={this.handleChange('plate')} />
                        </h4>
                        <h4>
                            Color:
                            <input className={this.props.classes.inputMargin} value={this.props.reduxState.viewVehicle.color} onChange={this.handleChange('color')} />
                        </h4>
                        <h4>
                            Other:
                            <input className={this.props.classes.inputMargin} value={this.props.reduxState.viewVehicle.other} onChange={this.handleChange('other')} />
                        </h4>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="secondary" className={this.props.classes.gridLeftBtn} onClick={this.handleSubmit}>Save</Button>
                        <Button variant="contained" color="secondary" className={this.props.classes.gridLeftBtn} onClick={this.handleCancel}>Cancel</Button>
                    </Grid>
                </Grid>
            </Grid>
            : // not in edit
            <Grid item container spacing={24} className={this.props.classes.componentMaxWidth}>
                <Grid item container spacing={24} className={this.props.classes.stickLeft}>
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
                        <Button variant="contained" color="secondary" className={this.props.classes.gridLeftBtn} onClick={this.handleEdit}>Edit</Button>
                    </Grid>
                </Grid>
            </Grid>;
            let vehicleReceipts = this.props.reduxState.vehicleReceipts.map(receipt => {
                return <Receipt receipt={receipt} key={receipt.id} />
            });
        return this.props.reduxState.viewVehicle.id ?
            <Grid container spacing={24} className={this.props.classes.componentContainer}>
                <Grid item xs={12} className={this.props.classes.componentHeader}>
                    <Button variant="contained" color="secondary" className={this.props.classes.headerButtonLeft} component={Link} to="/manage/customer">Back to Customer</Button>
                    <h3>View Vehicles</h3>
                </Grid>
                {editMode}
                <Grid item xs={12}>
                    <Button className={this.props.classes.componentSecondBtn} variant="contained" color="secondary" onClick={() => this.handleAddReceipts(this.props.reduxState.viewVehicle.id)}>Add Receipts</Button>
                </Grid>
                <Grid item xs={12}>
                    {vehicleReceipts}
                </Grid>
            </Grid>
            :
            <Grid container spacing={24} className={this.props.classes.componentContainer}>
                <Grid item xs={12} className={this.props.classes.componentHeader}>
                    <Button variant="contained" color="secondary" className={this.props.classes.headerButtonLeft} component={Link} to="/manage">Back to Manage</Button>
                    <h3>No vehicle selected</h3>
                </Grid>
            </Grid>;
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(Styles)(VehicleReceipts));
