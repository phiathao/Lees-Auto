import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Clear';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Tooltip from '@material-ui/core/Tooltip';

class ViewReceipt extends React.Component {
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
    handleChange = (property) => (event) => {
        this.props.dispatch({
            type: 'EDIT_RECEIPT',
            payload: { ...this.props.reduxState.viewReceipt, [property]: event.target.value }
        });
    }
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

                    {/* 
                        date: "2019-02-03T06:00:00.000Z"
                        description: null
                        due: 25.99
                        id: 3
                        payment_method: "CASH"
                        product_1: null
                        product_1_c: null
                        product_2: null
                        product_2_c: null
                        product_3: null
                        product_3_c: null
                        product_4: null
                        product_4_c: null
                        service_1: null
                        service_1_c: null
                        service_2: null
                        service_2_c: null
                        vehicle_id: 1
                        */}
                    <Grid item xs={12} sm={12}>
                        <Typography variant='h5' align='center'>Receipt ID: {this.props.reduxState.viewReceipt.id} DATE: {this.props.reduxState.viewReceipt.date}</Typography>
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
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            label="Other"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('description')}
                            className={classes.dialogTextField}
                            value={this.props.reduxState.viewReceipt.description ? this.props.reduxState.viewReceipt.description : ''}
                        />
                    </Grid>
                    <Grid item xs={10} sm={10}>
                        <TextField
                            fullWidth
                            label="Product 1"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('product_1')}
                            className={classes.dialogTextField}
                            value={this.props.reduxState.viewReceipt.product_1 ? this.props.reduxState.viewReceipt.product_1 : ''}
                        />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <TextField
                            fullWidth
                            label=""
                            type="text"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('product_1_c')}
                            className={classes.dialogTextField}
                            value={this.props.reduxState.viewReceipt.product_1_c ? this.props.reduxState.viewReceipt.product_1_c : ''}
                        />
                    </Grid>
                    <Grid item xs={10} sm={10}>
                        <TextField
                            fullWidth
                            label="Product 2"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('product_2')}
                            className={classes.dialogTextField}
                            value={this.props.reduxState.viewReceipt.product_2 ? this.props.reduxState.viewReceipt.product_2 : ''}
                        />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <TextField
                            fullWidth
                            label=""
                            type="text"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('product_2_c')}
                            className={classes.dialogTextField}
                            value={this.props.reduxState.viewReceipt.product_2_c ? this.props.reduxState.viewReceipt.product_2_c : ''}
                        />
                    </Grid>
                    <Grid item xs={10} sm={10}>
                        <TextField
                            fullWidth
                            label="Product 3"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('product_3')}
                            className={classes.dialogTextField}
                            value={this.props.reduxState.viewReceipt.product_3 ? this.props.reduxState.viewReceipt.product_3 : ''}
                        />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <TextField
                            fullWidth
                            label=""
                            type="text"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('product_3_c')}
                            className={classes.dialogTextField}
                            value={this.props.reduxState.viewReceipt.product_3_c ? this.props.reduxState.viewReceipt.product_3_c : ''}
                        />
                    </Grid>
                    <Grid item xs={10} sm={10}>
                        <TextField
                            fullWidth
                            label="Product 4"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('product_4')}
                            className={classes.dialogTextField}
                            value={this.props.reduxState.viewReceipt.product_4 ? this.props.reduxState.viewReceipt.product_4 : ''}
                        />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <TextField
                            fullWidth
                            label=""
                            type="text"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('product_4_c')}
                            className={classes.dialogTextField}
                            value={this.props.reduxState.viewReceipt.product_4_c ? this.props.reduxState.viewReceipt.product_4_c : ''}
                        />
                    </Grid>
                    <Grid item xs={10} sm={10}>
                        <TextField
                            fullWidth
                            label="Service 1"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('service_1')}
                            className={classes.dialogTextField}
                            value={this.props.reduxState.viewReceipt.service_1 ? this.props.reduxState.viewReceipt.service_1 : ''}
                        />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <TextField
                            fullWidth
                            label=""
                            type="text"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('service_1_c')}
                            className={classes.dialogTextField}
                            value={this.props.reduxState.viewReceipt.service_1_c ? this.props.reduxState.viewReceipt.service_1_c : ''}
                        />
                    </Grid>
                    <Grid item xs={10} sm={10}>
                        <TextField
                            fullWidth
                            label="Service 2"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('service_2')}
                            className={classes.dialogTextField}
                            value={this.props.reduxState.viewReceipt.service_2 ? this.props.reduxState.viewReceipt.service_2 : ''}
                        />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <TextField
                            fullWidth
                            label=""
                            type="text"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('service_2_c')}
                            className={classes.dialogTextField}
                            value={this.props.reduxState.viewReceipt.service_2_c ? this.props.reduxState.viewReceipt.service_2_c : ''}
                        />
                    </Grid>
                    <Grid item xs={10} sm={10}>
                        <TextField
                            fullWidth
                            label="Service 3"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('service_3')}
                            className={classes.dialogTextField}
                            value={this.props.reduxState.viewReceipt.service_3 ? this.props.reduxState.viewReceipt.service_3 : ''}
                        />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <TextField
                            fullWidth
                            label=""
                            type="text"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange('service_3_c')}
                            className={classes.dialogTextField}
                            value={this.props.reduxState.viewReceipt.service_3_c ? this.props.reduxState.viewReceipt.service_3_c : ''}
                        />
                    </Grid>
                    <Grid item xs={10} sm={10}>
                        <TextField
                            fullWidth
                            disabled
                            style={{ position: 'relative', }}
                            InputLabelProps={{
                                classes: {
                                    root: classes.rightAlign
                                }
                            }}
                            label="Sub Total"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                        />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <TextField
                            fullWidth
                            disabled
                            label=""
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            value={
                                parseFloat((this.props.reduxState.viewReceipt.product_1_c ? parseFloat(this.props.reduxState.viewReceipt.product_1_c) : 0) +
                                    (this.props.reduxState.viewReceipt.product_2_c ? parseFloat(this.props.reduxState.viewReceipt.product_2_c) : 0) +
                                    (this.props.reduxState.viewReceipt.product_3_c ? parseFloat(this.props.reduxState.viewReceipt.product_3_c) : 0) +
                                    (this.props.reduxState.viewReceipt.product_4_c ? parseFloat(this.props.reduxState.viewReceipt.product_4_c) : 0) +
                                    (this.props.reduxState.viewReceipt.service_1_c ? parseFloat(this.props.reduxState.viewReceipt.service_1_c) : 0) +
                                    (this.props.reduxState.viewReceipt.service_2_c ? parseFloat(this.props.reduxState.viewReceipt.service_2_c) : 0) +
                                    (this.props.reduxState.viewReceipt.service_3_c ? parseFloat(this.props.reduxState.viewReceipt.service_3_c) : 0)).toFixed(2)
                            }
                        />
                    </Grid>
                    <Grid item xs={10} sm={10}>
                        <TextField
                            fullWidth
                            disabled
                            style={{ position: 'relative', }}
                            InputLabelProps={{
                                classes: {
                                    root: classes.rightAlign
                                }
                            }}
                            label="Sales Tax"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                        />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <TextField
                            fullWidth
                            disabled
                            label=""
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            value={'5%'}
                        />
                    </Grid>
                    <Grid item xs={10} sm={10}>
                        <TextField
                            fullWidth
                            disabled
                            style={{ position: 'relative', }}
                            InputLabelProps={{
                                classes: {
                                    root: classes.rightAlign
                                }
                            }}
                            label="Tax"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                        />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <TextField
                            fullWidth
                            disabled
                            label=""
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            value={
                                parseFloat(((this.props.reduxState.viewReceipt.product_1_c ? parseFloat(this.props.reduxState.viewReceipt.product_1_c) : 0) +
                                    (this.props.reduxState.viewReceipt.product_2_c ? parseFloat(this.props.reduxState.viewReceipt.product_2_c) : 0) +
                                    (this.props.reduxState.viewReceipt.product_3_c ? parseFloat(this.props.reduxState.viewReceipt.product_3_c) : 0) +
                                    (this.props.reduxState.viewReceipt.product_4_c ? parseFloat(this.props.reduxState.viewReceipt.product_4_c) : 0) +
                                    (this.props.reduxState.viewReceipt.service_1_c ? parseFloat(this.props.reduxState.viewReceipt.service_1_c) : 0) +
                                    (this.props.reduxState.viewReceipt.service_2_c ? parseFloat(this.props.reduxState.viewReceipt.service_2_c) : 0) +
                                    (this.props.reduxState.viewReceipt.service_3_c ? parseFloat(this.props.reduxState.viewReceipt.service_3_c) : 0)) * .05).toFixed(2)
                            }
                        />
                    </Grid>
                    <Grid item xs={10} sm={10}>
                        <TextField
                            fullWidth
                            disabled
                            style={{ position: 'relative', }}
                            InputLabelProps={{
                                classes: {
                                    root: classes.rightAlign
                                }
                            }}
                            label="Total"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                        />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <TextField
                            fullWidth
                            disabled
                            label=""
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            value={
                                // sub total
                                parseFloat((this.props.reduxState.viewReceipt.product_1_c ? parseFloat(this.props.reduxState.viewReceipt.product_1_c) : 0) +
                                    (this.props.reduxState.viewReceipt.product_2_c ? parseFloat(this.props.reduxState.viewReceipt.product_2_c) : 0) +
                                    (this.props.reduxState.viewReceipt.product_3_c ? parseFloat(this.props.reduxState.viewReceipt.product_3_c) : 0) +
                                    (this.props.reduxState.viewReceipt.product_4_c ? parseFloat(this.props.reduxState.viewReceipt.product_4_c) : 0) +
                                    (this.props.reduxState.viewReceipt.service_1_c ? parseFloat(this.props.reduxState.viewReceipt.service_1_c) : 0) +
                                    (this.props.reduxState.viewReceipt.service_2_c ? parseFloat(this.props.reduxState.viewReceipt.service_2_c) : 0) +
                                    (this.props.reduxState.viewReceipt.service_3_c ? parseFloat(this.props.reduxState.viewReceipt.service_3_c) : 0) +
                                    // tax
                                    ((this.props.reduxState.viewReceipt.product_1_c ? parseFloat(this.props.reduxState.viewReceipt.product_1_c) : 0) +
                                        (this.props.reduxState.viewReceipt.product_2_c ? parseFloat(this.props.reduxState.viewReceipt.product_2_c) : 0) +
                                        (this.props.reduxState.viewReceipt.product_3_c ? parseFloat(this.props.reduxState.viewReceipt.product_3_c) : 0) +
                                        (this.props.reduxState.viewReceipt.product_4_c ? parseFloat(this.props.reduxState.viewReceipt.product_4_c) : 0) +
                                        (this.props.reduxState.viewReceipt.service_1_c ? parseFloat(this.props.reduxState.viewReceipt.service_1_c) : 0) +
                                        (this.props.reduxState.viewReceipt.service_2_c ? parseFloat(this.props.reduxState.viewReceipt.service_2_c) : 0) +
                                        (this.props.reduxState.viewReceipt.service_3_c ? parseFloat(this.props.reduxState.viewReceipt.service_3_c) : 0)) * .05).toFixed(2)
                            }
                        />
                    </Grid>
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
    rightAlign: {
        textAlign: 'right',
        float: 'right',
        position: 'absolute',
        right: theme.spacing.unit * 4,
    },
})

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(ViewReceipt));