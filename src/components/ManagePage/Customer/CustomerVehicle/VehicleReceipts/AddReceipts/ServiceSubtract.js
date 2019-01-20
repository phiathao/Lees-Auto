import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Styles from '../../../../../Styles/Styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';

class ServiceSubtract extends React.Component {
    state = ({
        service_id: ''
    })
    render() {
        return (
            <Grid item xs={12} className={this.props.classes.boxFormMaxWidth}>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item xs={1}>
                <Fab size="small" color="secondary" aria-label="Add" onClick={this.props.subtract}>
                  -
                </Fab>
              </Grid>
              <Grid item xs={11}>
                <TextField
                  select
                  label="Service"
                  type="text"
                  className={this.props.classes.boxFormOne}
                  margin="normal"
                  variant="filled"
                  onChange={this.props.handleChange('make')}
                >
                  {this.props.reduxState.services.map(service => {
                    return <MenuItem>{service.service_type}</MenuItem>
                  })}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(Styles)(ServiceSubtract));
