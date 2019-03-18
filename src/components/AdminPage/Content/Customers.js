import React from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';

import ViewVehicleInfo from '../ViewVehicle/ViewVehicle';
import ViewCustomerInfo from '../ViewCustomer/ViewCustomer';
import ViewAllCustomers from '../ViewAllCustomers/ViewAllCustomers';
import ViewReceipts from '../ViewReceipt/ViewReceipt';
import AddButton from '../AddButton/AddButton';

class ManageContent extends React.Component {

    render() {
        const { classes } = this.props

        return (
            <Paper className={classes.rootPadding}>

                <Collapse
                    in={this.props.reduxState.infoView === 3}
                    timeout={750}
                >
                    <ViewReceipts />
                </Collapse>

                <Collapse
                    in={this.props.reduxState.infoView === 2}
                    timeout={750}
                >
                    <ViewVehicleInfo />
                </Collapse>

                <Collapse
                    in={this.props.reduxState.infoView === 1}
                    timeout={750}
                >
                    <ViewCustomerInfo />
                </Collapse>

                <Collapse
                    in={this.props.reduxState.infoView === 0}
                    timeout={750}
                >
                    <ViewAllCustomers />
                </Collapse>
                <AddButton />
            </Paper>
        )
    }
}

const styles = theme => ({
    rootPadding: {
        padding: theme.spacing.unit * 3,
        height: '100%',
        backgroundColor: '#eee',
    },
});

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(ManageContent));