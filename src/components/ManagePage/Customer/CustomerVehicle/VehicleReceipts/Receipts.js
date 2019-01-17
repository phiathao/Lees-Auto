import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Styles from '../../../../Styles/Styles';
import Grid from '@material-ui/core/Grid';
import VehicleReceipts from './VehicleReceipts';


class Receipt extends React.Component {
    handleDelete = (receiptId) => {
        if (window.confirm('Delete Receipt?')) {
            this.props.dispatch({
                type: 'DELETE_RECEIPT',
                payload: this.props.receipt.id
            });
            this.props.dispatch({
                type: 'FETCH_DATA_VEHICLE',
                payload: this.props.receipt.vehicle_id
            });
        }
    }
    handleView = () => {
        this.props.dispatch({
            type: 'FETCH_DATA_RECEIPT',
            payload: this.props.receipt.id
        });
    }
    render() {
        let viewThisReceipt = this.props.reduxState.viewReceipt.view_id === this.props.receipt.id && (
            <Grid item xs={12}>
                {this.props.reduxState.viewReceipt.view_list.length > 1 ?
                    <CardContent>
                        <h4>Payment Method: {this.props.reduxState.viewReceipt.view_list[0].payment_method}</h4>
                        <h4>
                        Due: {this.props.reduxState.viewReceipt.view_list[0].due}</h4>
                        <h4>
                        Date: {this.props.reduxState.viewReceipt.view_list[0].date}</h4>
                        {this.props.reduxState.viewReceipt.view_list.map(receipt => {
                            return <h4>Service: {receipt.service_type}</h4>;
                        })}
                    </CardContent>
                    :
                this.props.reduxState.viewReceipt.view_list.length === 1 && (
                    <CardContent>
                        <h4>Payment Method: {this.props.reduxState.viewReceipt.view_list[0].payment_method}</h4>
                        <h4>
                        Due: {this.props.reduxState.viewReceipt.view_list[0].due}</h4>
                        <h4>
                        Date: {this.props.reduxState.viewReceipt.view_list[0].date}</h4>
                        <h4>Service: {this.props.reduxState.viewReceipt.view_list[0].service_type}</h4>
                    </CardContent>
                )
            }
            </Grid>
        );
        return (
            <Card className={this.props.classes.cardContainer}>
                <Grid container spacing={24}>
                    <Grid item xs={9}>
                        <CardContent>
                            <h4>{this.props.receipt.payment_method} {this.props.receipt.date} {this.props.receipt.due}</h4>
                        </CardContent>
                    </Grid>
                    <Grid item xs={3}>
                        <CardContent>
                            <Button className={this.props.classes.gridLeftBtn} variant="contained" color="secondary" onClick={this.handleView}>view</Button>
                            <Button className={this.props.classes.gridLeftBtn} variant="contained" color="secondary" onClick={() => this.handleDelete(this.props.receipt.id)}>delete</Button>
                        </CardContent>
                    </Grid>
                    {viewThisReceipt}
                </Grid>
            </Card>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(Styles)(Receipt));
