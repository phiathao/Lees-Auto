import React from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';

import ViewVehicleInfo from '../ViewVehicle/ViewVehicle';
import ViewCustomerInfo from '../ViewCustomer/ViewCustomer';
import ViewReceipts from '../ViewReceipts/ViewReceipts';
import CustomerTable from '../CustomerTable/CustomerTable';
import SpeedDial from '../SpeedDial/SpeedDial';


class ManageContent extends React.Component {

    render() {
        const { classes } = this.props

        return (
            <Paper className={classes.rootPadding}>

                <Collapse
                    in={this.props.reduxState.infoView.view === 3 && this.props.reduxState.infoView.viewMore === true}
                    timeout={750}
                >
                    <ViewReceipts />
                </Collapse>

                <Collapse
                    in={this.props.reduxState.infoView.view === 2 && this.props.reduxState.infoView.viewMore === true}
                    timeout={750}
                >
                    <ViewVehicleInfo />
                </Collapse>

                <Collapse
                    in={this.props.reduxState.infoView.view === 1 && this.props.reduxState.infoView.viewMore === true}
                    timeout={750}
                >
                    <ViewCustomerInfo />
                </Collapse>

                <Collapse
                    in={this.props.reduxState.infoView.view === 0 && this.props.reduxState.infoView.viewMore === true}
                    timeout={750}
                >
                    <ViewCustomerInfo />
                </Collapse>

                <Collapse
                    in={this.props.reduxState.infoView.viewMore === false}
                    timeout={750}
                >
                    <CustomerTable />

                </Collapse>

                <SpeedDial />
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