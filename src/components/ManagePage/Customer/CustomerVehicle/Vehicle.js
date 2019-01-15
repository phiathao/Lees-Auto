import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Styles from '../../../Styles/Styles';
import Grid from '@material-ui/core/Grid';


class Vehicle extends React.Component {
    handleDelete = (vehicleId) => {
        if (window.confirm('Delete Vehicle?')) {
            this.props.dispatch({
                type: 'DELETE_VEHICLE',
                payload: vehicleId
            });
            this.props.dispatch({
                type: 'FETCH_DATA_CUSTOMER',
                payload: this.props.reduxState.viewCustomer.id
            });
        }
    }
    handleView = () => {
        this.props.dispatch({
            type: 'FETCH_DATA_VEHICLE',
            payload: this.props.vehicle.id
        });
    }
    render() {
        return (
            <Card className={this.props.classes.cardContainer}>
                <Grid container spacing={24}>
                    <Grid item xs={9}>
                    <CardContent>
                        <h4>{this.props.vehicle.year} {this.props.vehicle.make} {this.props.vehicle.model}</h4>
                    </CardContent>
                    </Grid>
                    <Grid item xs={3}>
                    <CardContent>
                        <Button className={this.props.classes.gridLeftBtn} variant="contained" color="secondary" onClick={this.handleView} component={Link} to="/manage/vehicle">view</Button>
                        <Button className={this.props.classes.gridLeftBtn} variant="contained" color="secondary" onClick={() => this.handleDelete(this.props.vehicle.id)}>delete</Button>
                    </CardContent>
                    </Grid>
                </Grid>
            </Card>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(Styles)(Vehicle));
