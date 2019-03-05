import React from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CarIcon from '@material-ui/icons/DirectionsCar';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import AddCustomerDialog from '../AddCustomer/AddCustomer';
import AddVehicleDialog from '../AddVehicle/AddVehicle';
import AddReceiptDialog from '../AddReceipts/AddReceipt';

class SpeedDialComponent extends React.Component {
    state = {
        addCustomer: false,
        addVehicle: false,
        addReceipt: false,
        speedDialOpen: false,
    }

    // ---- Add Customer Dialog
    openAddCustomer = () => {
        this.setState({
            addCustomer: true
        })
    }
    closeAddCustomer = () => {
        this.setState({
            addCustomer: false
        })
    }
    // ---- End of Add Customer Dialog


    // ---- Add Vehicle Dialog
    openAddVehicle = () => {
        this.setState({
            addVehicle: true
        })
    }
    closeAddVehicle = () => {
        this.setState({
            addVehicle: false
        })
    }
    // ---- End of Add Vehicle Dialog


    // ---- Add Receipt Dialog
    openAddReceipt = () => {
        this.setState({
            addReceipt: true
        })
    }
    closeAddReceipt = () => {
        this.setState({
            addReceipt: false
        })
    }
    // ---- End of Add Receipt Dialog


    // ---- SpeedDial
    handleDialClick = () => {
        this.setState(state => ({
            speedDialOpen: !state.speedDialOpen,
        }));
    };
    handleDialOpen = () => {
        if (!this.state.hidden) {
            this.setState({
                speedDialOpen: true,
            });
        }
    };
    handleDialClose = () => {
        this.setState({
            speedDialOpen: false,
        });
    };
    // ---- End of SpeedDial
    render() {
        // speedDial selection
        const actions = [
            { icon: <PersonAddIcon onClick={this.openAddCustomer} />, name: 'Add Customer' },
            { icon: <CarIcon onClick={this.openAddVehicle} />, name: 'Add Vehicle' },
            { icon: <ReceiptIcon onClick={this.openAddReceipt} />, name: 'Add Receipt' },
        ];

        const { classes } = this.props;
        return (
            <>
                <AddCustomerDialog
                    open={this.state.addCustomer}
                    handleClose={this.closeAddCustomer}
                />
                <AddVehicleDialog
                    open={this.state.addVehicle}
                    handleClose={this.closeAddVehicle}
                />
                <AddReceiptDialog
                    open={this.state.addReceipt}
                    handleClose={this.closeAddReceipt}
                />
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    className={classes.speedDial}
                    icon={<SpeedDialIcon />}
                    onBlur={this.handleDialClose}
                    onClick={this.handleDialClick}
                    onClose={this.handleDialClose}
                    onFocus={this.handleDialOpen}
                    onMouseEnter={this.handleDialOpen}
                    onMouseLeave={this.handleDialClose}
                    open={this.state.speedDialOpen}
                >
                    {actions.map(action => {
                        return (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                tooltipOpen
                                onClick={this.handleDialClick}
                            />
                        )
                    })}
                </SpeedDial>
            </>
        )
    }
}
const styles = theme => ({
    speedDial: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
});

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(SpeedDialComponent));