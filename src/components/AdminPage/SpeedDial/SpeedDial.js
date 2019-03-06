import React from 'react';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button'

class ViewMore extends React.Component {

    handleClick = () => {
        this.props.dispatch({
            type: 'INFO_TO_VIEW',
            payload: { ...this.props.reduxState.infoView, viewMore: !this.props.reduxState.infoView.viewMore }
        })
    };

    render() {
        const { classes } = this.props;
        return (
            <Button
                className={classes.viewMore}
                onClick={this.handleClick}
                color="secondary"
                variant="contained"
                size="small"
            >
                {this.props.reduxState.infoView.viewMore ? 'View Less' : 'View More'}
            </Button>
        )
    }
}
const styles = theme => ({
    viewMore: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
});

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(ViewMore));