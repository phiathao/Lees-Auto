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

class ManageContent extends React.Component {
    handleViewVehicle = (id) => {
        this.props.history.push(`/manage/vehicle/${id}`)
        this.props.dispatch({ type: 'SET_DRAWER_VIEW_VEHICLE' })
    }
    handleViewCustomer = (id) => {
        this.props.history.push(`/manage/customer/${id}`)
        this.props.dispatch({ type: 'SET_DRAWER_VIEW_CUSTOMER' })
    }
    render() {
        // map data receive and put into table
        let dataList = this.props.reduxState.dataManage.map((item, i) => {
            return (
                <TableRow 
                    hover
                    onClick={item.vehicle_id ? () => this.handleViewVehicle(item.vehicle_id) : () => this.handleViewCustomer(item.id)}
                    key={i}>
                    {item.vehicle_id ? <TableCell>{item.make} {item.model}</TableCell> : <TableCell>No Vehicle</TableCell>}
                    <TableCell>{item.first_name}</TableCell>
                    <TableCell>{item.last_name}</TableCell>
                    <TableCell><Button variant='contained' color='primary' onClick={() => this.handleDelete(item.vehicle_id, item.id)}>Remove</Button></TableCell>
                </TableRow>
            )
        }
        ) // end of map
        const classes = this.props
        return (
            <Grid container className={classes.componentGrid}>
                <Grid item xs={12} className={this.props.classes.componentHeader}>
                    <h3>Manage Customers and Vehicles</h3>
                </Grid>
                <Grid item container xs={12}>
                    <Button className={this.props.classes.componentSecondBtn} variant='contained' color='secondary' component={Link} to='/manage/add'>Add Customer</Button>
                </Grid>
                <Grid item container xs={12}>
                    <TextField
                        id="filled-search"
                        label="Search"
                        type="search"
                        className={this.props.classes.searchField}
                        margin="normal"
                        variant="filled"
                    />
                </Grid>
                {/* <Grid container xs={24}>
                <Grid item xs={12} className="component-header">
                    <Button variant="contained" color="secondary" className="button-return-left" component={Link} to="/manage">Back to Manage</Button>
                    <h3>View Customer</h3>
                </Grid>
                {editMode}
                <Button variant="contained" color="secondary" onClick={() => this.handleAddVehicle(this.props.reduxState.viewCustomer.id)}>Add Vehicle</Button>
                {customerVehicles}
            </Grid> */}
                {/* table */}
                <Grid item xs={12} className={this.props.classes.noPadding}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Vehicle</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Remove</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataList}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default withRouter(connect(mapStateToProps)(withStyles(Styles)(ManageContent)));