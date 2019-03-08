import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Clear';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Tooltip from '@material-ui/core/Tooltip';

class ViewReceipts extends React.Component {
    // state = {
    //     edit: false
    // }
    // componentWillUpdate(newProps, newState) {
    //     if (newState.edit === true
    //         && this.state.edit === true
    //         && (newProps.reduxState.viewVehicle.vehicle_id !== this.props.reduxState.viewVehicle.vehicle_id
    //             || newProps.reduxState.infoView !== this.props.reduxState.infoView)) {
    //         this.setState({
    //             edit: false,
    //         })
    //     }
    // }
    // handleEdit = () => {
    //     this.setState({
    //         edit: !this.state.edit
    //     });
    // }
    // handleChange = (property) => (event) => {
    //     this.props.dispatch({
    //         type: 'EDIT_VEHICLE',
    //         payload: { ...this.props.reduxState.viewVehicle, [property]: event.target.value }
    //     });
    // }
    // handleCancel = (id) => {
    //     this.props.dispatch({
    //         type: 'SET_VIEW_VEHICLE',
    //         payload: this.props.reduxState.vehiclesData.filter(vehicle => vehicle.vehicle_id === id),
    //     });
    //     this.handleEdit();
    // }
    // handleSave = () => {
    //     const {
    //         make,
    //         model,
    //         year,
    //         plate,
    //         color,
    //         other,
    //         vehicle_id,
    //     } = this.props.reduxState.viewVehicle;
    //     this.props.dispatch({
    //         type: 'UPDATE_VEHICLE',
    //         payload: {
    //             make,
    //             model,
    //             year,
    //             plate,
    //             color,
    //             other,
    //             id: vehicle_id,
    //         },
    //     });
    //     this.handleEdit();
    // }
    render() {
        const { classes } = this.props
        return (
            <Paper className={classNames(classes.root, classes.viewInfoContainer, { [classes.paperIsActive]: this.props.reduxState.infoView === 3 })}>
                <Grid container spacing={8}>
                    {/* {!this.state.edit ?
                        <>
                            <Tooltip title="View Receipts">
                                <Fab color="primary" aria-label="View Receipts" className={classes.infoCancel} onClick={this.handleViewReceipts}>
                                    <ReceiptIcon />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="Edit">
                                <Fab color="secondary" aria-label="Edit" className={classes.infoFab} onClick={this.handleEdit}>
                                    <EditIcon />
                                </Fab>
                            </Tooltip>
                        </>
                        :
                        <>
                            <Tooltip title="Cancel Change">
                                <Fab color="primary" aria-label="Cancel" className={classes.infoCancel} onClick={() => this.handleCancel(this.props.reduxState.viewVehicle.vehicle_id)}>
                                    <CancelIcon />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="Save Change">
                                <Fab color="secondary" aria-label="Save" className={classes.infoFab} onClick={this.handleSave}>
                                    <CheckIcon />
                                </Fab>
                            </Tooltip>
                        </>
                    } */}
                    <Grid item xs={12} sm={12}>
                        <Typography variant='h5' align='center'>Vehicle Receipts</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            disabled
                            label="Vehicle"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            value={this.props.reduxState.viewVehicle.vehicle_id ? `${this.props.reduxState.viewVehicle.year} ${this.props.reduxState.viewVehicle.make} ${this.props.reduxState.viewVehicle.model} ${this.props.reduxState.viewVehicle.plate}` : ''}
                        >
                        </TextField>
                    </Grid>
                    {/* 
                    date: "2019-01-01T06:00:00.000Z"
                    description: "customer ask to look at tire tread also"
                    due: 29.99
                    payment_method: "DEBIT"
                    receipt_id: 1
                    services: Array(2) 
                        amount: 30.99
                        service_id: 1
                        service_type: "Oil Change"
                    */}
                    {this.props.reduxState.viewReceipts.map(receipt => {
                        return (
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    disabled
                                    label={`Receipt ID:${receipt.receipt_id}   Date:${receipt.date}`}
                                    multiline
                                    // rows={3}
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    value={
                                        `Payment Method: ${receipt.payment_method}
Due: ${receipt.due}
Other: ${receipt.description === null ? '' : receipt.description}
Service: 
${receipt.services.map(service => { return service.service_type})}`}
                                    className={classes.dialogTextField}
                                    InputLabelProps={receipt && {
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Paper>
        )
    }
}
const styles = theme => ({
    root: {
        width: '100%',
    },
    viewInfoContainer: {
        minHeight: theme.spacing.unit * 30,
        padding: theme.spacing.unit * 2,
        position: 'relative',
    },
    dialogTextField: {
        marginTop: theme.spacing.unit - 3,
        marginBottom: theme.spacing.unit - 8,
    },
    paperIsActive: {
        marginBottom: theme.spacing.unit * 3,
    },
    infoFab: {
        position: 'absolute',
        top: theme.spacing.unit * .5,
        right: theme.spacing.unit * 2,
        transform: `scale(${theme.spacing.unit * .1})`,
    },
    infoCancel: {
        position: 'absolute',
        top: theme.spacing.unit * .5,
        right: theme.spacing.unit * 10,
        transform: `scale(${theme.spacing.unit * .1})`,
    },
})

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(ViewReceipts));