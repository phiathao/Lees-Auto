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

import Grow from '@material-ui/core/Grow';



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

    // ---- View Info
    handleSelectCustomer = (id) => {
        this.props.dispatch({
            type: 'INFO_TO_VIEW',
            payload: 1,
        })
        this.props.dispatch({
            type: 'SET_VIEW_CUSTOMER',
            payload: this.props.reduxState.customersData.filter(person => person.id === id),
        })
    }

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
            <Paper className={classes.rootPadding}>
                {this.props.reduxState.infoView === 0 ? <></>
                    :
                    this.props.reduxState.infoView === 1 &&
                    <Grow
                        in={this.props.reduxState.infoView === 1}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(this.props.reduxState.infoView === 1 ? { timeout: 1000 } : {})}
                    >
                        <Paper className={classNames(classes.root, classes.viewInfoContainer)}>
                            <Grid container spacing={8}>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant='h5' align='center'>Customer Information</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        disabled
                                        label="First Name"
                                        type="search"
                                        margin="normal"
                                        variant="outlined"
                                        className={classes.dialogTextField}
                                        value={this.props.reduxState.viewCustomer[0].first_name}
                                        onChange={this.handleChange('first_name')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        disabled
                                        label="Last Name"
                                        type="search"
                                        margin="normal"
                                        variant="outlined"
                                        className={classes.dialogTextField}
                                        value={this.props.reduxState.viewCustomer[0].last_name}
                                        onChange={this.handleChange('last_name')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        fullWidth
                                        disabled
                                        label="Phone Number"
                                        type="search"
                                        margin="normal"
                                        variant="outlined"
                                        className={classes.dialogTextField}
                                        value={this.props.reduxState.viewCustomer[0].phone}
                                        onChange={this.handleChange('phone')}
                                        inputProps={{
                                            maxLength: 10,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        fullWidth
                                        disabled
                                        label="Street Address"
                                        type="search"
                                        margin="normal"
                                        variant="outlined"
                                        className={classes.dialogTextField}
                                        value={this.props.reduxState.viewCustomer[0].street}
                                        onChange={this.handleChange('street')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        disabled
                                        label="City"
                                        type="search"
                                        margin="normal"
                                        variant="outlined"
                                        className={classes.dialogTextField}
                                        value={this.props.reduxState.viewCustomer[0].city}
                                        onChange={this.handleChange('city')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        disabled
                                        label="Zip Code"
                                        type="text"
                                        margin="normal"
                                        variant="outlined"
                                        className={classes.dialogTextField}
                                        value={this.props.reduxState.viewCustomer[0].zip}
                                        onChange={this.handleChange('zip')}
                                        inputProps={{
                                            maxLength: 5,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        fullWidth
                                        disabled
                                        label="State"
                                        type="text"
                                        margin="normal"
                                        variant="outlined"
                                        className={classes.dialogTextField}
                                        value={this.props.reduxState.viewCustomer[0].state}
                                        onChange={this.handleChange('state')}
                                        inputProps={{
                                            maxLength: 2,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grow>
                }
                <Paper className={classes.root}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h5" align="center" className={classes.header}>Manage Customers</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.searchPadding}>
                            <TextField
                                fullWidth
                                id="filled-search"
                                label="Search"
                                type="search"
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.overflowScroll}>
                            {this.props.reduxState.customersData.map((customer, i) => {
                                return (
                                    <ExpansionPanel
                                        key={customer.id}
                                        className={classNames(classes.root, { [classes.isActive]: expanded === `${customer.id}` })}
                                        expanded={expanded === `${customer.id}`}
                                        onChange={this.handleChange(`${customer.id}`)}
                                    >
                                        <ExpansionPanelSummary
                                            className={classes.row}
                                            expandIcon={<ExpandMoreIcon />}
                                            onClick={() => this.handleSelectCustomer(customer.id)}
                                        >
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
                </Paper >
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
            </Paper>
        )
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    overflowScroll: {
        overflow: 'scroll',
        maxHeight: theme.spacing.unit * 30,
    },
    rootPadding: {
        padding: theme.spacing.unit * 3,
        height: '100%',
        backgroundColor: '#eee',
        '& > div': {
            marginBottom: theme.spacing.unit * 3,
        },
    },
    dialogTextField: {
        marginTop: theme.spacing.unit - 3,
        marginBottom: theme.spacing.unit - 8,
    },
    viewInfoContainer: {
        minHeight: theme.spacing.unit * 30,
        padding: theme.spacing.unit * 2,
    },
    header: {
        padding: theme.spacing.unit * 2,
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
    searchPadding: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
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
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
});

const mapStateToProps = reduxState => ({
    reduxState,
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ManageContent)));