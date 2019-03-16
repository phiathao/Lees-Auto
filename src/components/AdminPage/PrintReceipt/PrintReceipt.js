import React from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


class PrintReceipt extends React.Component {
  handleBack = () => {
    this.props.dispatch({
      type: 'INFO_TO_VIEW',
      payload: 3,
    });
  }
  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paperPrint}>
        <Grid container spacing={8}>
          <Grid item container xs={12} className={classes.receiptHeader}>
            <Grid item xs={1}>
              <IconButton onClick={this.handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid item xs={2}>
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
            <Grid item container xs={12}>
              <Grid item xs={12}>
                <Typography align='center'>Customer</Typography>
                <hr />
              </Grid>
              <Grid item container xs={5} direction='column'>
                <Grid item container xs={12}>
                  <Grid item xs={6}>
                    <Typography align='right'>First Name:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.leftPadding}>{this.props.reduxState.viewCustomer.first_name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>Home Phone:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.leftPadding}>{this.props.reduxState.viewCustomer.phone}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>Address:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.leftPadding}>{this.props.reduxState.viewCustomer.street}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>City:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.leftPadding}>{this.props.reduxState.viewCustomer.city}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={7} direction='column'>
                <Grid item container xs={12}>
                  <Grid item xs={6}>
                    <Typography align='right'>Last Name:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.leftPadding}>{this.props.reduxState.viewCustomer.last_name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>Cell Phone:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.leftPadding}>{this.props.reduxState.viewCustomer.phone_2}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>City:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.leftPadding}>{this.props.reduxState.viewCustomer.city}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>State:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.leftPadding}>{this.props.reduxState.viewCustomer.state}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Vehicle */}
            <Grid item xs={12}>
              <hr />
              <Typography align='center'>Vehicle</Typography>
              <hr />
            </Grid>

            <Grid item container xs={12}>
              <Grid item container xs={5} direction='column'>
                <Grid item container xs={12}>
                  <Grid item xs={6}>
                    <Typography align='right'>Year:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.leftPadding}>{this.props.reduxState.viewVehicle.year}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>Make:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.leftPadding}>{this.props.reduxState.viewVehicle.make}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>Vin Number:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.leftPadding}>{this.props.reduxState.viewVehicle.vin}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>Plate:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.leftPadding}>{this.props.reduxState.viewVehicle.plate}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={7} direction='column'>
                <Grid item container xs={12}>
                  <Grid item xs={6}>
                    <Typography align='right'>Color:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.leftPadding}>{this.props.reduxState.viewVehicle.color}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>Model:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.leftPadding}>{this.props.reduxState.viewVehicle.model}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align='right'>Odometer:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.leftPadding}>{this.props.reduxState.viewVehicle.odometer}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* TERMS, AGREEMENT and SIGNATURE */}
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

          {/* SIDE RECEIPT */}
          <Grid item container xs={5}>
            <Grid item xs={12} className={classes.gridPad}>
              <div className={classes.divContainer}>
                <Typography className={classes.divContent}>{this.props.reduxState.viewReceipt.description}</Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography>Product:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{this.props.reduxState.viewReceipt.product_1}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>$</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{this.props.reduxState.viewReceipt.product_2}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>$</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{this.props.reduxState.viewReceipt.product_3}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>$</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{this.props.reduxState.viewReceipt.product_4}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>$</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Service:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{this.props.reduxState.viewReceipt.service_1}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>$45.00</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{this.props.reduxState.viewReceipt.service_2}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>$40.00</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{this.props.reduxState.viewReceipt.service_3}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>$</Typography>
            </Grid>

            <Grid item xs={9}>
              <Typography>Sub Total</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>$</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>Sales Tax</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>5%</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>Tax</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>$</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>Total</Typography>
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
  divContainer: {
    borderStyle: 'solid',
    borderColor: 'rgba( 176,  176,  176, .5)',
    borderWidth: '1px',
    borderRadius: '4px',
    width: '100%',
    '&:hover': {
      borderColor: 'rgba( 0,  0,  0, .5)',
    },
    height: theme.spacing.unit * 10,
  },
  divContent: {
    padding: '18.5px 14px',
  },
  gridPad: {
    paddingTop: theme.spacing.unit - 3,
    paddingBottom: theme.spacing.unit - 3,
  },
});

const mapStateToProps = reduxState => ({
  reduxState,
});


export default connect(mapStateToProps)(withStyles(styles)(PrintReceipt));
