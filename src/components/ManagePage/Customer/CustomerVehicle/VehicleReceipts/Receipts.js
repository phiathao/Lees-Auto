import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Styles from '../../../../Styles/Styles';
import Grid from '@material-ui/core/Grid';


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
                {this.props.reduxState.viewReceipt.view_list.map(receipt => {
                    return (
                        <CardContent key={receipt.id}>
                            Date: {receipt.date}
                        </CardContent>
                    )
                })}
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
