import React from 'react';

class ViewVehicle extends React.Component {
    render() {
        const { classes } = this.props.classes
        return <Paper className={classNames(classes.root, classes.viewInfoContainer, { [classes.paperIsActive]: this.props.reduxState.infoView === 2 })}>
            <Grid container spacing={8}>
                <Grid item xs={12} sm={12}>
                    <Typography variant='h5' align='center'>Vehicle Information</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField fullWidth disabled label="Customer" type="text" margin="normal" variant="outlined" value={this.props.reduxState.viewVehicle ? `${this.props.reduxState.viewVehicle[0].first_name} ${this.props.reduxState.viewVehicle[0].last_name}` : ''} className={classes.dialogTextField}>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth disabled label="Make" type="text" margin="normal" variant="outlined" className={classes.dialogTextField} value={this.props.reduxState.viewVehicle ? this.props.reduxState.viewVehicle[0].make : ''} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth disabled label="Model" type="text" margin="normal" variant="outlined" className={classes.dialogTextField} value={this.props.reduxState.viewVehicle ? this.props.reduxState.viewVehicle[0].model : ''} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth disabled label="Year" type="text" margin="normal" variant="outlined" className={classes.dialogTextField} value={this.props.reduxState.viewVehicle ? this.props.reduxState.viewVehicle[0].year : ''} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth disabled label="Plate" type="text" margin="normal" variant="outlined" className={classes.dialogTextField} value={this.props.reduxState.viewVehicle ? this.props.reduxState.viewVehicle[0].plate : ''} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth disabled label="Color" type="text" margin="normal" variant="outlined" className={classes.dialogTextField} value={this.props.reduxState.viewVehicle ? this.props.reduxState.viewVehicle[0].color : ''} />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField fullWidth disabled label="Other" multiline rows={3} type="text" margin="normal" variant="outlined" className={classes.dialogTextField} value={this.props.reduxState.viewVehicle ? this.props.reduxState.viewVehicle[0].other : ''} />
                </Grid>
            </Grid>
        </Paper>
    }
}
export default ViewVehicle;