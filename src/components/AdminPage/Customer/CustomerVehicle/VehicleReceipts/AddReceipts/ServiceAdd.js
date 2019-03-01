import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Styles from '../../../../../Styles/Styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';

class ServiceAdd extends React.Component {
    state = ({
        service_id: ''
    })
    handleChange = (event) => {
        this.setState ({
            service_id: event.target.value
        })
    }
    render() {
        return (
            <Grid item xs={12} className={this.props.classes.boxFormMaxWidth}>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item xs={1}>
                        <Fab size="small" color="secondary" aria-label="Add" onClick={this.props.add}>
                            +
                        </Fab>
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            select
                            label="Service"
                            type="text"
                            value={this.state.service_id}
                            className={this.props.classes.boxFormOne}
                            margin="normal"
                            variant="filled"
                            onChange={this.handleChange}
                        >
                            {this.props.reduxState.services.map(service => {
                                return <MenuItem key={service.id} value={service.id}>{service.service_type}</MenuItem>
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

export default connect(mapStateToProps)(withStyles(Styles)(ServiceAdd));
