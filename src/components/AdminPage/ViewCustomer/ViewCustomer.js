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

import AddVehicleDialog from '../AddVehicle/AddVehicle';

class ViewCustomer extends React.Component {
    state = {
        edit: false,
        addVehicle: false,
    }
    componentWillUpdate(newProps, newState) {
        if (newState.edit === true
            && this.state.edit === true
            && (newProps.reduxState.viewCustomer.id !== this.props.reduxState.viewCustomer.id
                || newProps.reduxState.infoView.view !== this.props.reduxState.infoView.view)) {
            this.setState({
                edit: false,
            })
        }
    }
    handleEdit = () => {
        this.setState({
            edit: !this.state.edit
        });
    }
    handleChange = (property) => (event) => {
        this.props.dispatch({
            type: 'EDIT_CUSTOMER',
            payload: { ...this.props.reduxState.viewCustomer, [property]: event.target.value }
        });
    }
    handleCancel = (id) => {
        this.props.dispatch({
            type: 'SET_VIEW_CUSTOMER',
            payload: this.props.reduxState.customersData.filter(person => person.id === id),
        });
        this.handleEdit();
    }
    handleSave = () => {
        const {
            first_name,
            last_name,
            phone,
            street,
            city,
            zip,
            state,
            id,
        } = this.props.reduxState.viewCustomer;
        this.props.dispatch({
            type: 'UPDATE_CUSTOMER',
            payload: {
                first_name,
                last_name,
                phone,
                street,
                city,
                zip,
                state,
                id,
            },
        });
        this.handleEdit();
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

    handleSelectVehicle = (id) => {
        this.props.dispatch({
            type: 'INFO_TO_VIEW',
            payload: { ...this.props.reduxState.infoView, view: 2 },
        });
        this.props.dispatch({
            type: 'SET_VIEW_VEHICLE',
            payload: this.props.reduxState.vehiclesData.filter(vehicle => vehicle.vehicle_id === id),
        });
    }

    render() {
        const { classes } = this.props
        const { id } = this.props.reduxState.viewCustomer

        return (
            <Paper className={classNames(classes.root, classes.viewInfoContainer, { [classes.paperIsActive]: this.props.reduxState.infoView.view === 1 })}>
                <Grid container spacing={8}>
                    {!this.state.edit ?
                        <Fab color="secondary" aria-label="Edit" className={classes.infoFab} onClick={this.handleEdit}>
                            <EditIcon />
                        </Fab>
                        :
                        <>
                            <Fab color="primary" aria-label="Cancel" className={classes.infoCancel} onClick={() => this.handleCancel(this.props.reduxState.viewCustomer.id)}>
                                <CancelIcon />
                            </Fab>
                            <Fab color="secondary" aria-label="Save" className={classes.infoFab} onClick={this.handleSave}>
                                <CheckIcon />
                            </Fab>
                        </>
                    }
                    <Grid item xs={12} sm={12}>
                        <Typography variant='h5' align='center'>Customer Information</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            disabled={!this.state.edit}
                            label="First Name"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            onChange={this.handleChange('first_name')}
                            value={this.props.reduxState.viewCustomer.first_name}
                            InputLabelProps={this.props.reduxState.viewCustomer.first_name && {
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            disabled={!this.state.edit}
                            label="Last Name"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            onChange={this.handleChange('last_name')}
                            value={this.props.reduxState.viewCustomer.last_name}
                            InputLabelProps={this.props.reduxState.viewCustomer.last_name && {
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            disabled={!this.state.edit}
                            label="Phone Number"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            onChange={this.handleChange('phone')}
                            value={this.props.reduxState.viewCustomer.phone}
                            InputLabelProps={this.props.reduxState.viewCustomer.phone && {
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            disabled={!this.state.edit}
                            label="Street Address"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            onChange={this.handleChange('street')}
                            value={this.props.reduxState.viewCustomer.street}
                            InputLabelProps={this.props.reduxState.viewCustomer.street && {
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            disabled={!this.state.edit}
                            label="City"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            onChange={this.handleChange('city')}
                            value={this.props.reduxState.viewCustomer.city}
                            InputLabelProps={this.props.reduxState.viewCustomer.city && {
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            disabled={!this.state.edit}
                            label="Zip Code"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            onChange={this.handleChange('zip')}
                            value={this.props.reduxState.viewCustomer.zip}
                            InputLabelProps={this.props.reduxState.viewCustomer.zip && {
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            fullWidth
                            disabled={!this.state.edit}
                            label="State"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            onChange={this.handleChange('state')}
                            value={this.props.reduxState.viewCustomer.state}
                            InputLabelProps={this.props.reduxState.viewCustomer.state && {
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        {this.props.reduxState.viewCustomer.id && this.props.reduxState.viewCustomer.vehicles.map(vehicle => {
                            return (
                                <Grid item xs={12} sm={12} key={vehicle.vehicle_id} className={classes.gridPad}>
                                    <div className={classes.divContainer} onClick={() => this.handleSelectVehicle(vehicle.vehicle_id)}>
                                        <Typography className={classes.divContent}>{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.plate}</Typography>
                                    </div>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
                <AddVehicleDialog
                    open={this.state.addVehicle}
                    handleClose={this.closeAddVehicle}
                />
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
    divContainer: {
        borderStyle: 'solid',
        borderColor: 'rgba( 176,  176,  176, .5)',
        borderWidth: '1px',
        borderRadius: '4px',
        width: '100%',
        '&:hover': {
            borderColor: 'rgba( 0,  0,  0, .5)',
        },
    },
    divContent: {
        padding: '18.5px 14px',
    },
    gridPad: {
        paddingTop: theme.spacing.unit - 3,
        paddingBottom: theme.spacing.unit - 3,
    }
})

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(ViewCustomer));