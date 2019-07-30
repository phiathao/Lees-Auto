import React from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { Paper, TextField, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

class Contact extends React.Component {
  componentDidMount = () => {
    this.props.dispatch({
      type: 'SET_HEADER',
      payload: { value: 4 },
    })
  }
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.container}>
        <Typography variant="h2" component="h5">Send us a message</Typography>
        <Grid container spacing={6}>
          <Grid item xs={8}>
            <Typography>You can contact us with anything related to our services.</Typography>
            <TextField 
              placeholder="name"
            />

          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 12,
    margin: "auto",
    width: "90vw",
    padding: theme.spacing.unit * 5,
  },
});

export default connect(mapStateToProps)(withStyles(styles)(Contact));
