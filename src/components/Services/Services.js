import React from 'react';
import { withStyles } from '@material-ui/core';
import Styles from '../Styles/Styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Services extends React.Component {
    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_FEATURE'});
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.serviceItem}>
                <h3>{this.props.reduxState.featureService.service_type}</h3>
                <p className={classes.serviceP}>{this.props.reduxState.featureService.description}</p>
                <Button variant="contained" color="secondary" className={classes.serviceButton} component={Link} to="/services">other services</Button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(Styles)(Services));