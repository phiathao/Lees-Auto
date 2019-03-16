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
import Tooltip from '@material-ui/core/Tooltip';


class ViewVehicle extends React.Component {
    state = {
        edit: false,
    }
    componentWillUpdate(newProps, newState) {
        if (newState.edit === true
            && this.state.edit === true
            && (newProps.reduxState.viewVehicle.vehicle_id !== this.props.reduxState.viewVehicle.vehicle_id
                || newProps.reduxState.infoView !== this.props.reduxState.infoView)) {
            this.setState({
                edit: false,
            })
        }
    }
    componentDidUpdate(newProps) {
        if (this.props.reduxState.viewVehicle.receipts && (newProps.reduxState.viewVehicle.vehicle_id !== this.props.reduxState.viewVehicle.vehicle_id)) {
            this.props.dispatch({
                type: 'SET_VIEW_VEHICLE_RECEIPTS',
                payload: this.props.reduxState.viewVehicle.receipts,
            });
        }
    }
    handleEdit = () => {
        this.setState({
            edit: !this.state.edit
        });
    }
    handleChange = (property) => (event) => {
        this.props.dispatch({
            type: 'EDIT_VEHICLE',
            payload: { ...this.props.reduxState.viewVehicle, [property]: event.target.value }
        });
    }
    handleCancel = (id) => {
        this.props.dispatch({
            type: 'SET_VIEW_VEHICLE',
            payload: this.props.reduxState.vehiclesData.filter(vehicle => vehicle.vehicle_id === id),
        });
        this.handleEdit();
    }
    handleSave = () => {
        const {
            make,
            model,
            year,
            plate,
            color,
            other,
            vin,
            odometer,
            vehicle_id,
        } = this.props.reduxState.viewVehicle;
        this.props.dispatch({
            type: 'UPDATE_VEHICLE',
            payload: {
                make,
                model,
                year,
                plate,
                color,
                other,
                vin,
                odometer,
                id: vehicle_id,
            },
        });
        this.handleEdit();
    }
    handleSelectReceipt = (id) => {
        this.props.dispatch({
            type: 'INFO_TO_VIEW',
            payload: 3,
        });
        this.props.dispatch({
            type: 'FETCH_DATA_RECEIPT',
            payload: id,
        });
    }

    render() {
        const { classes } = this.props
        return (
            <Paper className={classNames(classes.root, classes.viewInfoContainer, { [classes.paperIsActive]: this.props.reduxState.infoView === 2 })}>
                <Grid container spacing={8}>
                    {!this.state.edit ?
                        <Tooltip title="Edit">
                            <Fab color="secondary" aria-label="Edit" className={classes.infoFab} onClick={this.handleEdit}>
                                <EditIcon />
                            </Fab>
                        </Tooltip>
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
                    }
                    <Grid item xs={12} sm={12}>
                        <Typography variant='h5' align='center'>Vehicle Information</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            disabled
                            label="Customer"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            value={this.props.reduxState.viewVehicle ? `${this.props.reduxState.viewVehicle.first_name} ${this.props.reduxState.viewVehicle.last_name}` : ''}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            disabled={!this.state.edit}
                            label="Make"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            onChange={this.handleChange('make')}
                            value={this.props.reduxState.viewVehicle.make ? this.props.reduxState.viewVehicle.make : ''}
                            InputLabelProps={this.props.reduxState.viewVehicle.make && {
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            disabled={!this.state.edit}
                            label="Model"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            onChange={this.handleChange('model')}
                            value={this.props.reduxState.viewVehicle.model ? this.props.reduxState.viewVehicle.model : ''}
                            InputLabelProps={this.props.reduxState.viewVehicle.model && {
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            disabled={!this.state.edit}
                            label="Year"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            onChange={this.handleChange('year')}
                            value={this.props.reduxState.viewVehicle.year ? this.props.reduxState.viewVehicle.year : ''}
                            InputLabelProps={this.props.reduxState.viewVehicle.year && {
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            disabled={!this.state.edit}
                            label="Plate"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            onChange={this.handleChange('plate')}
                            value={this.props.reduxState.viewVehicle.plate ? this.props.reduxState.viewVehicle.plate : ''}
                            InputLabelProps={this.props.reduxState.viewVehicle.plate && {
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            disabled={!this.state.edit}
                            label="Color"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            onChange={this.handleChange('color')}
                            value={this.props.reduxState.viewVehicle.color ? this.props.reduxState.viewVehicle.color : ''}
                            InputLabelProps={this.props.reduxState.viewVehicle.color && {
                                shrink: true,
                            }}
                        />
                    </Grid><Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            disabled={!this.state.edit}
                            label="Vin"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            onChange={this.handleChange('vin')}
                            value={this.props.reduxState.viewVehicle.vin ? this.props.reduxState.viewVehicle.vin : ''}
                            InputLabelProps={this.props.reduxState.viewVehicle.vin && {
                                shrink: true,
                            }}
                        />
                    </Grid><Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            disabled={!this.state.edit}
                            label="Odometer"
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            onChange={this.handleChange('odometer')}
                            value={this.props.reduxState.viewVehicle.odometer ? this.props.reduxState.viewVehicle.odometer : ''}
                            InputLabelProps={this.props.reduxState.viewVehicle.odometer && {
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            disabled={!this.state.edit}
                            label="Other"
                            multiline
                            rows={3}
                            type="text"
                            margin="normal"
                            variant="outlined"
                            className={classes.dialogTextField}
                            onChange={this.handleChange('other')}
                            value={this.props.reduxState.viewVehicle.other ? this.props.reduxState.viewVehicle.other : ''}
                            InputLabelProps={this.props.reduxState.viewVehicle.other && {
                                shrink: true,
                            }}
                        />
                    </Grid>
                    {this.props.reduxState.vehicleReceipts.map(receipt => {
                        return <Grid item xs={12} sm={12} key={receipt.receipt_id}>
                            <div className={classes.divContainer} onClick={()=>this.handleSelectReceipt(receipt.receipt_id)}>
                                {receipt.due ? 
                                <Typography className={classes.divContent}>Receipt ID: {receipt.receipt_id} Date: {receipt.date} Sub Total: {receipt.due}</Typography>
                                :
                                <Typography className={classes.divContent}>Receipt ID: {receipt.receipt_id} Date: {receipt.date}  <b>NEW RECEIPT</b></Typography>
                                }
                            </div>
                        </Grid>
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
})

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(ViewVehicle));