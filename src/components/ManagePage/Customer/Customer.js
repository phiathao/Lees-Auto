import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Customer extends React.Component {
    render() {
        return this.props.reduxState.viewCustomer ?
            <div>
                <div className="component-header">
                    <Button variant="contained" color="secondary" className="button-return-left" component={Link} to="/manage">Back to Manage</Button>
                    <h3>View Customer</h3>
                </div>
                <div className="box-form whole-line">
                    <h4>{this.props.reduxState.viewCustomer.first_name} </h4>
                </div>
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
