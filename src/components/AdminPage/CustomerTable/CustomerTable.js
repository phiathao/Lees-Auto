import React from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import TablePagination from '@material-ui/core/TablePagination';
import Collapse from '@material-ui/core/Collapse';
import PersonIcon from '@material-ui/icons/Person';
import CarIcon from '@material-ui/icons/DirectionsCar';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


class CustomerTable extends React.Component {
    state = {
        page: 0,
        rowsPerPage: 5,
    }

    handleClear = () => {
        this.props.dispatch({
            type: 'INFO_TO_VIEW',
            payload: 0
        });
        this.props.dispatch({
            type: 'CLEAR_CUSTOMER',
        });
        this.props.dispatch({
            type: 'CLEAR_VEHICLE',
        });
    }
    // --- Handle View Info
    handleSelectCustomer = (id) => {
        if (id === this.props.reduxState.viewCustomer.id) {
            this.handleClear();
        } else {
            this.props.dispatch({
                type: 'INFO_TO_VIEW',
                payload: 1,
            });
            this.props.dispatch({
                type: 'SET_VIEW_CUSTOMER',
                payload: this.props.reduxState.customersData.filter(person => person.id === id),
            });
        }
    }
    handleSelectVehicle = (id) => {
        this.props.dispatch({
            type: 'INFO_TO_VIEW',
            payload: 2,
        });
        this.props.dispatch({
            type: 'SET_VIEW_VEHICLE',
            payload: this.props.reduxState.vehiclesData.filter(vehicle => vehicle.vehicle_id === id),
        });
    }
    // -- End of Handle View Info

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

    // ---- Table Page
    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    // ---- End of Table Page

    render() {

        const { expanded } = this.state;
        const { classes } = this.props;

        const { rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.reduxState.customersData.length - page * rowsPerPage);
        let emptyRow = []
        if (emptyRows > 0) {
            for (let i = 0; i < emptyRows; i++) {
                emptyRow.push(<ListItem dense key={`empty ${i}`}><ListItemIcon><PersonIcon className={classes.clear}/></ListItemIcon></ListItem>)
            }
        }

        return (
            <>
                {this.props.reduxState.customersData.length > 0 && this.props.reduxState.customersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer, i) => {
                    return (
                        <div key={i}>
                            <ListItem
                                button
                                selected={this.props.reduxState.viewCustomer.id === customer.id && this.props.reduxState.infoView === 1}
                                onClick={() => this.handleSelectCustomer(customer.id)}
                                dense
                            >
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText inset primary={`${customer.first_name} ${customer.last_name}`} />
                                {this.props.reduxState.viewCustomer.id === customer.id ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={this.props.reduxState.viewCustomer.id === customer.id} timeout="auto" unmountOnExit>
                                {this.props.reduxState.customersData.length > 0 && customer.vehicles.map((vehicle, i) => {
                                    return (
                                        <ListItem
                                            button
                                            selected={(this.props.reduxState.infoView === 2 || this.props.reduxState.infoView === 3 || this.props.reduxState.infoView === 4) && this.props.reduxState.viewVehicle.vehicle_id === vehicle.vehicle_id}
                                            onClick={() => this.handleSelectVehicle(vehicle.vehicle_id)}
                                            dense
                                            className={classes.vehiclePadding}
                                            key={`vehicle ${i}`}
                                        >
                                            <ListItemIcon>
                                                <CarIcon />
                                            </ListItemIcon>
                                            <ListItemText inset primary={`${vehicle.make} ${vehicle.model}`} />
                                        </ListItem>
                                    )
                                })}
                            </Collapse>
                        </div>
                    )
                })}
                {emptyRow}
                <TablePagination
                            rowsPerPageOptions={false}
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
                        />

                {/* <Grid container>
                    <Tooltip title="Add New Customer" placement="bottom">
                        <Fab color="secondary" aria-label="Add Customer" className={classes.infoFab} onClick={this.openAddCustomer}>
                            <PersonAddIcon />
                        </Fab>
                    </Tooltip>
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
                        {this.props.reduxState.customersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer, i) => {
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

                                </ExpansionPanel>
                            )
                        })}
                        {emptyRow}
                        
                    </Grid>
                </Grid> */}
            </>
        )
    }
}

const styles = theme => ({
    vehiclePadding: {
        paddingLeft: theme.spacing.unit * 4,
    },
    clear: {
        opacity: 0,
    },
});

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(CustomerTable));