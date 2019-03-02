import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Styles from '../../Styles/Styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AddCustomerDialog from '../AddCustomer/AddCustomer';

class ManageContent extends React.Component {
    state = {
        addCustomer: false,
        expanded: null,
    }
    handleViewVehicle = (id) => {
        this.props.history.push(`/manage/vehicle/${id}`);
        this.props.dispatch({ type: 'SET_DRAWER_VIEW_VEHICLE' });
    }
    handleViewCustomer = (id) => {
        this.props.history.push(`/manage/customer/${id}`);
        this.props.dispatch({ type: 'SET_DRAWER_VIEW_CUSTOMER' });
    }
    openAddCustomer = () => {
        this.setState({
            ...this.state, addCustomer: true
        })
    }
    closeAddCustomer = () => {
        this.setState({
            ...this.state, addCustomer: false
        })
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { classes } = this.props
        const { expanded } = this.state;
        return (
            <Paper className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <h3>Manage Customers and Vehicles</h3>
                    </Grid>
                    <Grid item container xs={12}>
                        <Button variant='contained' color='secondary' onClick={this.openAddCustomer}>Add Customer</Button>
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
                                <ExpansionPanel key={customer.id} className={classes.root} expanded={expanded === `${customer.id}`} onChange={this.handleChange(`${customer.id}`)}>
                                    <ExpansionPanelSummary className={classes.row} expandIcon={<ExpandMoreIcon />}>
                                        <Typography className={classes.column}>{customer.first_name}</Typography>
                                        <Typography className={classes.column}>{customer.last_name}</Typography>
                                    </ExpansionPanelSummary>
                                    {customer.vehicles.length === 0 ?
                                        <ExpansionPanelDetails>
                                            <Typography>
                                                Customer have no vehicle
                                        </Typography>
                                        </ExpansionPanelDetails>
                                        : <>
                                            {customer.vehicles.map(vehicle => {
                                                return (
                                                    <ExpansionPanelDetails key={vehicle.vehicle_id}>
                                                        <Typography>
                                                            {vehicle.make} 
                                                            {vehicle.model}
                                                        </Typography>
                                                    </ExpansionPanelDetails>
                                                )
                                            })
                                            }
                                        </>
                                    }

                                </ExpansionPanel>
                            )
                        })}
                    </Grid>
                </Grid>
                <AddCustomerDialog open={this.state.addCustomer} handleClose={this.closeAddCustomer} />
            </Paper >
        )
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    column: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
    },
    row: {
        '&:hover': {
            backgroundColor: "#f2f2f2",
        }
    }
});

const mapStateToProps = reduxState => ({
    reduxState,
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ManageContent)));