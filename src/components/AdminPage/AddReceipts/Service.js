import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Styles from '../../Styles/Styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';

class Service extends React.Component {
    state = ({
        service_id: ''
    })
    handleChange = (event) => {
        this.setState({
            service_id: event.target.value
        })
    }
    render() {
        const { classes } = this.props
        return (
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    select
                    label="Service"
                    type="text"
                    value={this.state.service_id}
                    className={classes.dialogTextField}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange}
                >
                    {this.props.reduxState.services.map(service => {
                        return <MenuItem key={service.id} value={service.id}>{service.service_type}</MenuItem>
                    })}
                </TextField>
            </Grid>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(Styles)(Service));
