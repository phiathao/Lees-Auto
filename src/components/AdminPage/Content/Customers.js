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
import Collapse from '@material-ui/core/Collapse';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Tab } from '@material-ui/core';

class ManageContent extends React.Component {
    state = {
        addCustomer: false,
        addVehicle: false,
        addReceipt: false,
        expanded: false,
        speedDialOpen: false,
        page: 0,
        rowsPerPage: 5,
    }
    handleViewVehicle = (id) => {
        this.props.history.push(`/manage/vehicle/${id}`);
        this.props.dispatch({ type: 'SET_DRAWER_VIEW_VEHICLE' });
    }
    handleViewCustomer = (id) => {
        this.props.history.push(`/manage/customer/${id}`);
        this.props.dispatch({ type: 'SET_DRAWER_VIEW_CUSTOMER' });
    }


    // ---- Table Page
    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    // ---- End of Table Page


    // ---- Expansion Panel
    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
        setTimeout(() =>
            this.state.expanded === panel ?
                this.handleSelectCustomer(parseInt(panel))
                :
                this.props.dispatch({ type: 'INFO_TO_VIEW', payload: 0 }),
            100)
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
    handleSelectVehicle = (id) => {
        this.props.dispatch({
            type: 'INFO_TO_VIEW',
            payload: 2,
        })
        this.props.dispatch({
            type: 'SET_VIEW_VEHICLE',
            payload: this.props.reduxState.vehiclesData.filter(vehicle => vehicle.vehicle_id === id),
        })
    }


    // ---- End View Info

    render() {
        const { classes } = this.props
        const { expanded } = this.state;

        // speedDial selection
        const actions = [
            { icon: <PersonAddIcon onClick={this.openAddCustomer} />, name: 'Add Customer' },
            { icon: <CarIcon onClick={this.openAddVehicle} />, name: 'Add Vehicle' },
            { icon: <ReceiptIcon onClick={this.openAddReceipt} />, name: 'Add Receipt' },
        ];

        const { rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.reduxState.customersData.length - page * rowsPerPage);
        let emptyRow = []
        if (emptyRows > 0) {
            for (let i = 0; i < emptyRows; i++) {
                emptyRow.push(<TableRow component={ExpansionPanel}/>)
            }
        }

        return (
            <Paper className={classes.rootPadding}>
                <Collapse
                    in={this.props.reduxState.infoView === 2}
                    timeout={750}
                >
                    <Paper className={classNames(classes.root, classes.viewInfoContainer, { [classes.paperIsActive]: this.props.reduxState.infoView === 2 })}>
                        <Grid container spacing={8}>
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
                                    value={this.props.reduxState.viewVehicle ? `${this.props.reduxState.viewVehicle[0].first_name} ${this.props.reduxState.viewVehicle[0].last_name}` : ''}
                                    className={classes.dialogTextField}
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    disabled
                                    label="Make"
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    className={classes.dialogTextField}
                                    value={this.props.reduxState.viewVehicle ? this.props.reduxState.viewVehicle[0].make : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    disabled
                                    label="Model"
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    className={classes.dialogTextField}
                                    value={this.props.reduxState.viewVehicle ? this.props.reduxState.viewVehicle[0].model : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    disabled
                                    label="Year"
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    className={classes.dialogTextField}
                                    value={this.props.reduxState.viewVehicle ? this.props.reduxState.viewVehicle[0].year : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    disabled
                                    label="Plate"
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    className={classes.dialogTextField}
                                    value={this.props.reduxState.viewVehicle ? this.props.reduxState.viewVehicle[0].plate : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    disabled
                                    label="Color"
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    className={classes.dialogTextField}
                                    value={this.props.reduxState.viewVehicle ? this.props.reduxState.viewVehicle[0].color : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    disabled
                                    label="Other"
                                    multiline
                                    rows={3}
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    className={classes.dialogTextField}
                                    value={this.props.reduxState.viewVehicle ? this.props.reduxState.viewVehicle[0].other : ''}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Collapse>
                <Collapse
                    in={this.props.reduxState.infoView === 1}
                    timeout={750}
                >
                    <Paper className={classNames(classes.root, classes.viewInfoContainer, { [classes.paperIsActive]: this.props.reduxState.infoView === 1 })}>
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
                                    value={this.props.reduxState.viewCustomer ? this.props.reduxState.viewCustomer[0].first_name : ''}
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
                                    value={this.props.reduxState.viewCustomer ? this.props.reduxState.viewCustomer[0].last_name : ''}
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
                                    value={this.props.reduxState.viewCustomer ? this.props.reduxState.viewCustomer[0].phone : ''}
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
                                    value={this.props.reduxState.viewCustomer ? this.props.reduxState.viewCustomer[0].street : ''}
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
                                    value={this.props.reduxState.viewCustomer ? this.props.reduxState.viewCustomer[0].city : ''}
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
                                    value={this.props.reduxState.viewCustomer ? this.props.reduxState.viewCustomer[0].zip : ''}
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
                                    value={this.props.reduxState.viewCustomer ? this.props.reduxState.viewCustomer[0].state : ''}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Collapse>
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
                        <Grid item xs={12}>
                            <div>
                                <Table>
                                    <TableBody>
                                        {this.props.reduxState.customersData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((customer, i) => {
                                            return (
                                                <>
                                                    <TableRow
                                                        key={customer.id}
                                                        className={classNames(classes.root, { [classes.isActive]: expanded === `${customer.id}` })}
                                                        expanded={expanded === `${customer.id}`}
                                                        onChange={this.handleChange(`${customer.id}`)}
                                                        component={ExpansionPanel}
                                                    >
                                                        <ExpansionPanelSummary
                                                            className={classes.row}
                                                            expandIcon={<ExpandMoreIcon />}
                                                        >
                                                            <Typography className={classes.columnH}>{customer.first_name}</Typography>
                                                            <Typography className={classes.columnH}>{customer.last_name}</Typography>
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
                                                                            onClick={() => this.handleSelectVehicle(vehicle.vehicle_id)}
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

                                                    </TableRow>

                                                </>
                                            )

                                        })}
                                        {emptyRow}
                                    </TableBody>
                                </Table>
                            </div>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component='div'
                                count={this.props.reduxState.customersData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                backIconButtonProps={{
                                    'aria-label': 'Previous Page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'Next Page',
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
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
    rootPadding: {
        padding: theme.spacing.unit * 3,
        height: '100%',
        backgroundColor: '#eee',
    },
    paperIsActive: {
        marginBottom: theme.spacing.unit * 3,
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