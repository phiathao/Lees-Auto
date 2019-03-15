import React from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import AddVehicleDialog from '../AddVehicle/AddVehicle';
import AddReceiptDialog from '../AddReceipts/AddReceipt';
import AddCustomerDialog from '../AddCustomer/AddCustomer';

class AddButton extends React.Component {
    state = {
        addCustomer: false,
        addVehicle: false,
        addReceipt: false,
    }

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

    // ---- Save Receipt and View PRINT receipt

    saveReceipt = () => {
        this.props.dispatch({
            type: 'UPDATE_RECEIPT',
            payload: this.props.reduxState.viewReceipt,
        })
        this.props.dispatch({
            type: 'INFO_TO_VIEW',
            payload: 4,
        })
    }

    // ---- End of Save Receipt and View PRINT receipt
    render() {
        const { classes } = this.props;
        return (
            <>
                {this.props.reduxState.infoView !== 4 && (
                    <Button
                        className={classes.viewMore}
                        onClick={
                            this.props.reduxState.infoView === 0 ? this.openAddCustomer
                                : this.props.reduxState.infoView === 1 ? this.openAddVehicle
                                    : this.props.reduxState.infoView === 2 ? this.openAddReceipt
                                        : this.props.reduxState.infoView === 3 && this.saveReceipt}
                        color="secondary"
                        variant="contained"
                        size="small"
                    >
                        {this.props.reduxState.infoView === 0 ? 'Add Customer'
                            : this.props.reduxState.infoView === 1 ? 'Add Vehicle'
                                : this.props.reduxState.infoView === 2 ? 'Add Receipt'
                                    : this.props.reduxState.infoView === 3 && 'Print View'}
                    </Button>
                )}
                <AddVehicleDialog
                    open={this.state.addVehicle}
                    handleClose={this.closeAddVehicle}
                />
                <AddReceiptDialog
                    open={this.state.addReceipt}
                    handleClose={this.closeAddReceipt}
                />
                <AddCustomerDialog
                    open={this.state.addCustomer}
                    handleClose={this.closeAddCustomer}
                />
            </>
        )
    }
}
const styles = theme => ({
    viewMore: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
});

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(AddButton));