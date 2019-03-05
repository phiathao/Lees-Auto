import React from 'react';

import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import image from '../image/motor.jpg';

class Services extends React.Component {
    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_FEATURE' });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.pl}>
                </div>
                <div className={classes.hServiceFeature}>
                    <h3>{this.props.reduxState.featureService.service_type}</h3>
                    <p className={classes.hServiceP}>{this.props.reduxState.featureService.description}</p>
                    <Button variant="contained" color="secondary" className={classes.hServiceButton} component={Link} to="/services">other services</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

const styles = theme => ({
    hServiceFeature: {
        textAlign: "center",
        margin: 0,
        color: "white",
        backgroundColor: "#6a7b83",
        overflow: "hidden",
        paddingBottom: 30,
        paddingTop: 30,
        borderBottom: "#2196f3 solid 2px",
        borderTop: "#2196f3 solid 2px",
        minHeight: 200,
    },
    hServiceP: {
        width: "90%",
        margin: "auto",
    },
    pl: {
        backgroundImage: `url(${image})`,
        height: '100%',
        minHeight: '300px',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    hServiceButton: {
        margin: 15,
    },
});

export default connect(mapStateToProps)(withStyles(styles)(Services));