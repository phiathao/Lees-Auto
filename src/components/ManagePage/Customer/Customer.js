import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Vehicle from './CustomerVehicle/Vehicle';

class Customer extends React.Component {
    state = {
        edit: false
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
            payload: this.props.reduxState.viewCustomer.id
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
        let editMode =
            <div className="box-container">
                {this.state.edit ?
                    // in edit
                    <div className="stick-left">
                        <div className="two-box">
                            <h4>Name: <input value={this.props.reduxState.viewCustomer.first_name} onChange={this.handleChange('first_name')} /> <input value={this.props.reduxState.viewCustomer.last_name} onChange={this.handleChange('last_name')} /></h4>
                        </div>
                        <div className="two-box">
                            <Button variant="contained" color="secondary" onClick={this.handleSubmit}>Save Change</Button>
                            <Button variant="contained" color="secondary" onClick={this.handleCancel}>Cancel Edit</Button>
                        </div>
                        <h4>Phone: <input value={this.props.reduxState.viewCustomer.phone} onChange={this.handleChange('phone')} /></h4>
                        <h4>Address: <input value={this.props.reduxState.viewCustomer.street} onChange={this.handleChange('street')} /> <input value={this.props.reduxState.viewCustomer.city} onChange={this.handleChange('city')} /> <input value={this.props.reduxState.viewCustomer.zip} onChange={this.handleChange('zip')} /> <input value={this.props.reduxState.viewCustomer.state} onChange={this.handleChange('state')} /></h4>
                    </div>
                    : // not in edit
                    <div className="stick-left">
                        <div className="two-box">
                            <h4>Name: {this.props.reduxState.viewCustomer.first_name} {this.props.reduxState.viewCustomer.last_name}</h4>
                        </div>
                        <div className="two-box">
                            <Button variant="contained" color="secondary" className="stick-right" onClick={this.handleEdit}>Edit</Button>
                        </div>
                        <h4>Phone: {this.props.reduxState.viewCustomer.phone}</h4>
                        <h4>Address: {this.props.reduxState.viewCustomer.street} {this.props.reduxState.viewCustomer.city} {this.props.reduxState.viewCustomer.zip} {this.props.reduxState.viewCustomer.state}</h4>
                    </div>
                }
            </div>;
        let customerVehicles = this.props.reduxState.customerVehicles.map(vehicle => {
            return <Vehicle vehicle={vehicle} key={vehicle.id}/>
        });
        // <Card className="card-container">
        //     {JSON.stringify(this.props.reduxState.customerVehicles)}
        // </Card>;
        return this.props.reduxState.viewCustomer ?
            <div>
                <div className="component-header">
                    <Button variant="contained" color="secondary" className="button-return-left" component={Link} to="/manage">Back to Manage</Button>
                    <h3>View Customer</h3>
                </div>
                {editMode}
          <Button variant="contained" color="secondary" onClick={()=>this.handleAddVehicle(this.props.reduxState.viewCustomer.id)}>Add Vehicle</Button>
                {customerVehicles}
            </div>
            :
            <div>
                <div className="component-header">
                    <Button variant="contained" color="secondary" className="button-return-left" component={Link} to="/manage">Back to Manage</Button>
                    <h3>No customer selected</h3>
                </div>
            </div>
        // : <>{this.props.history.push('/manage')}</>
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(Customer);
