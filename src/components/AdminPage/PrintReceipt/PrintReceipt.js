import React from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';


class PrintReceipt extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paperPrint}>
        <Grid container spacing={8}>
          <Grid item container xs={12} className={classes.receiptHeader}>
            <Grid item xs={3}>
              <Typography>Date: {this.props.reduxState.viewReceipt.date}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Lee's Auto Service and Body Repair</Typography>
              <Typography>2032 S. 17th Street</Typography>
              <Typography>Sheboygan, WI 53081</Typography>
              <Typography>Phone: (920)453-4080</Typography>
              <Typography>Fax: (920)453-4081</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>Receipt ID: {this.props.reduxState.viewReceipt.id}</Typography>
            </Grid>
          </Grid>
          <Grid item container xs={7}>
            <Grid item container xs={5} direction='column'>
              <Grid item container xs={12}>
                <Grid item xs={6}>
                  <Typography align='right'>First Name:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.leftPadding}>John</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align='right'>Home Phone:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.leftPadding}>763.777.7777</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align='right'>Address:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.leftPadding}>123 N. A Street</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align='right'>City:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.leftPadding}>Sheboygan</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align='right'>Year:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.leftPadding}>2006</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align='right'>Make:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.leftPadding}>Toyota</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align='right'>Vin Number:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.leftPadding}>2414125P2141K:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align='right'>Plate:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.leftPadding}>54PL-44KI</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={7} direction='column'>
              <Grid item container xs={12}>
                <Grid item xs={6}>
                  <Typography align='right'>Last Name:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.leftPadding}>Doe</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align='right'>Cell Phone:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.leftPadding}></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align='right'>City:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.leftPadding}>Sheboygan</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align='right'>State:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.leftPadding}>WI</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align='right'>Color:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.leftPadding}>Black</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align='right'>Model:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.leftPadding}>Camry</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align='right'>Odometer:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.leftPadding}>152655</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align='right'>Plate:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={classes.leftPadding}>54PL-44KI</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.termsAndCondition}>
                I HEREBY AUTHORIZE the above repair work to be done along with necessary materials. You and your employees may operate the above vehicle for purpose of testing inspection or delivery at my risk. An express mechanic's lien is acknowledged on above vehicle to secure the amount of repairs thereto. You will not be held responsible for the loss or damage to vehicle or articles left in case of fire, theft, accident or any cause beyond your control or for any delays caused by unavailability of parts or delays in parts shipments by the supplier or transporter. I understand that all charges are due up on delivery of the vehicle. I acknowledge receipt of a copy of this agreement.
            </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.termsAndCondition}>
              Customer's Signature _________________________________________
            </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={5}>
            <Grid item xs={12}>
              <Typography>Product:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>2 Linkages</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>$</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography></Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>$</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography></Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>$</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography></Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>$</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Service:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>Labor Cost</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>$45.00</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>Change Oil and Filter</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>$40.00</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography></Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>$</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const styles = theme => ({
  receiptHeader: {
    textAlign: 'center',
  },
  leftPadding: {
    paddingLeft: theme.spacing.unit * 2,
  },
  termsAndCondition: {
    padding: theme.spacing.unit * 2,
  },
  paperPrint: {
    padding: theme.spacing.unit * 2,
    minHeight: '100vh',
  },
});

const mapStateToProps = reduxState => ({
  reduxState,
});


export default connect(mapStateToProps)(withStyles(styles)(PrintReceipt));
