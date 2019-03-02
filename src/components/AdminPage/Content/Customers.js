import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Styles from '../../Styles/Styles';
import classNames from 'classnames'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CarIcon from '@material-ui/icons/DirectionsCar';
import ReceiptIcon from '@material-ui/icons/Receipt';
import InfoIcon from '@material-ui/icons/Info';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import AddCustomerDialog from '../AddCustomer/AddCustomer';
import AddVehicleDialog from '../AddVehicle/AddVehicle';
import AddReceiptDialog from '../AddReceipts/AddReceipt';


class ManageContent extends React.Component {
    state = {
        addCustomer: false,
        addVehicle: false,
        addReceipt: false,
        expanded: null,
        speedDialOpen: false,
    }
    handleViewVehicle = (id) => {
        this.props.history.push(`/manage/vehicle/${id}`);
        this.props.dispatch({ type: 'SET_DRAWER_VIEW_VEHICLE' });
    }
    handleViewCustomer = (id) => {
        this.props.history.push(`/manage/customer/${id}`);
        this.props.dispatch({ type: 'SET_DRAWER_VIEW_CUSTOMER' });
    }


    // ---- Expansion Panel
    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };
    // ---- End of Expansion Panel


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
        const { classes } = this.props
        const { expanded } = this.state;

        // speedDial selection
        const actions = [
            { icon: <PersonAddIcon onClick={this.openAddCustomer} />, name: 'Add Customer' },
            { icon: <CarIcon onClick={this.openAddVehicle} />, name: 'Add Vehicle' },
            { icon: <ReceiptIcon onClick={this.openAddReceipt} />, name: 'Add Receipt' },
        ];

        return (
            <Paper className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <h3>Manage Customers</h3>
                    </Grid>
                    <Grid item container xs={12}>
                        <TextField
                            id="filled-search"
                            label="Search"
                            type="search"
                            margin="normal"
                            variant="filled"
                        />
                    </Grid>
                    <Grid item container xs={12} >
                        {this.props.reduxState.dataManage.map((customer, i) => {
                            return (
                                <ExpansionPanel
                                    key={customer.id}
                                    className={classNames(classes.root, {[classes.isActive]: expanded === `${customer.id}`})}
                            
                                    expanded={expanded === `${customer.id}`}
                                    onChange={this.handleChange(`${customer.id}`)}
                                >
                                    <ExpansionPanelSummary
                                        className={classes.row}
                                        expandIcon={<ExpandMoreIcon />}>
                                        <Typography className={classes.columnH}>{customer.first_name}</Typography>
                                        <Typography className={classes.columnH}>{customer.last_name}</Typography>
                                        <Typography className={classes.columnH}>
                                            <IconButton className={classes.icon}><InfoIcon /></IconButton>
                                            <IconButton className={classes.icon}><DeleteIcon /></IconButton>
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    {customer.vehicles.length === 0 ?
                                        <ExpansionPanelDetails className={classes.rowSub} >
                                            <Typography>
                                                Customer have no vehicle
                                            </Typography>
                                        </ExpansionPanelDetails>
                                        : <div>
                                            {customer.vehicles.map(vehicle => {
                                                return (
                                                    <ExpansionPanelDetails
                                                        className={classes.rowSub}
                                                        key={vehicle.vehicle_id}
                                                    >
                                                        <Typography className={classes.column}>
                                                            {`${vehicle.color} ${vehicle.make} ${vehicle.model}`}
                                                        </Typography>
                                                        <Typography className={classes.column}>
                                                            {vehicle.plate}
                                                        </Typography>
                                                    </ExpansionPanelDetails>
                                                )
                                            })
                                            }
                                        </div>
                                    }

                                </ExpansionPanel>
                            )
                        })}
                    </Grid>
                </Grid>
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
                    // hidden={hidden}
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
            </Paper >
        )
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    isActive: {
        '&>div:first-child': {
            backgroundColor: '#eee',
        },
    },
    column: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
    },
    columnH: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
    },
    row: {
        '&:hover': {
            backgroundColor: "#f2f2f2",
        },
    },
    rowSub: {
        '&:hover': {
            backgroundColor: "#f2f2f2",
        },
        paddingLeft: theme.spacing.unit * 6,
        paddingRight: theme.spacing.unit * 1,
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 1,
    },
    icon: {
        margin: 0,
        padding: 0,
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
});

const mapStateToProps = reduxState => ({
    reduxState,
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ManageContent)));