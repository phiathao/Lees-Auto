import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class Vehicle extends React.Component {
    state = {
        edit: false
    }
    handleEdit = () => {
        this.props.dispatch({
            type: 'FETCH_DATA_VEHICLE',
            payload: this.props.vehicle.id
        });
        this.setState({
            edit: true
        });
    }
    handleCancel = () => {
        this.props.dispatch({
            type: 'FETCH_DATA_VEHICLE',
            payload: this.props.vehicle.id
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
                payload: this.props.reduxState.viewCustomer.id
            });
        }
    }
    handleView = () => {
        this.props.dispatch({
            type: 'FETCH_DATA_VEHICLE',
            payload: this.props.vehicle.id
        });
    }
    render() {
        return (
            <>
                {this.state.edit ?
                    // in edit
                    <Card className="card-container">
                        <CardContent>
                            Year: <input
                                type="text"
                                value={this.props.reduxState.viewVehicle.year}
                                onChange={this.handleChange('year')} />
                        </CardContent>
                        <CardContent>
                            Make: <input
                                type="text"
                                value={this.props.reduxState.viewVehicle.make}
                                onChange={this.handleChange('make')} />
                        </CardContent>
                        <CardContent>
                            Model: <input
                                type="text"
                                value={this.props.reduxState.viewVehicle.model}
                                onChange={this.handleChange('model')} />
                        </CardContent>
                        <CardContent>
                            Color: <input
                                type="text"
                                value={this.props.reduxState.viewVehicle.color}
                                onChange={this.handleChange('color')} />
                        </CardContent>
                        <CardContent>
                            Plate: <input
                                type="text"
                                value={this.props.reduxState.viewVehicle.plate}
                                onChange={this.handleChange('plate')} />
                        </CardContent>
                        <CardContent>
                            Other: <input
                                type="text"
                                value={this.props.reduxState.viewVehicle.other}
                                onChange={this.handleChange('other')} />
                        </CardContent>
                        <Button variant="contained" color="secondary" onClick={this.handleView} component={Link} to="/manage/vehicle">view</Button>
                        <Button variant="contained" color="secondary" onClick={this.handleSubmit}>submit</Button>
                        <Button variant="contained" color="secondary" onClick={this.handleCancel}>cancel edit</Button>
                        <Button variant="contained" color="secondary" onClick={()=>this.handleDelete(this.props.reduxState.viewVehicle.id)}>delete</Button>
                    </Card>
                    :
                    // not in edit
                    <Card className="card-container">
                        <CardContent>
                            Year: {this.props.vehicle.year}
                        </CardContent>
                        <CardContent>
                            Make: {this.props.vehicle.make}
                        </CardContent>
                        <CardContent>
                            Model: {this.props.vehicle.model}
                        </CardContent>
                        <CardContent>
                            Color: {this.props.vehicle.color}
                        </CardContent>
                        <CardContent>
                            Plate: {this.props.vehicle.plate}
                        </CardContent>
                        <CardContent>
                            Other: {this.props.vehicle.other}
                        </CardContent>
                        <Button variant="contained" color="secondary" onClick={this.handleView} component={Link} to="/manage/vehicle">view</Button>
                        <Button variant="contained" color="secondary" onClick={this.handleEdit}>edit</Button>
                        <Button variant="contained" color="secondary" onClick={()=>this.handleDelete(this.props.vehicle.id)}>delete</Button>
                    </Card>}
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(Vehicle);
