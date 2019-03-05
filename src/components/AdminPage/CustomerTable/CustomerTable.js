import React from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class CustomerTable extends React.Component {
    state = {
        expanded: null,
        page: 0,
        rowsPerPage: 5,
    }

    // --- Handle View Info
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
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
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
                emptyRow.push(<ExpansionPanel expanded={false}><ExpansionPanelSummary /></ExpansionPanel>)
            }
        }

        return (
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
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
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
        )
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    header: {
        padding: theme.spacing.unit * 2,
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
    isActive: {
        '&>div:first-child': {
            backgroundColor: '#eee',
        },
    },
    searchPadding: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
});

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(CustomerTable));