import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Clear';


class ViewAllCustomers extends React.Component {
    state = {
        edit: false,
    }
    componentWillUpdate(newProps, newState) {
        if (newState.edit === true
            && this.state.edit === true
            && (newProps.reduxState.viewCustomer.id !== this.props.reduxState.viewCustomer.id
                || newProps.reduxState.infoView.view !== this.props.reduxState.infoView.view)) {
            this.setState({
                edit: false,
            })
        }
    }
    handleEdit = () => {
        this.setState({
            edit: !this.state.edit
        });
    }
    handleChange = (property) => (event) => {
        this.props.dispatch({
            type: 'EDIT_CUSTOMER',
            payload: { ...this.props.reduxState.viewCustomer, [property]: event.target.value }
        });
    }
    handleCancel = (id) => {
        this.props.dispatch({
            type: 'SET_VIEW_CUSTOMER',
            payload: this.props.reduxState.customersData.filter(person => person.id === id),
        });
        this.handleEdit();
    }
    handleSelectCustomer = (id) => {
        this.props.dispatch({
            type: 'INFO_TO_VIEW',
            payload: 1,
        });
        this.props.dispatch({
            type: 'SET_VIEW_CUSTOMER',
            payload: this.props.reduxState.customersData.filter(customer => customer.id === id),
        });
    }

    render() {
        const { classes } = this.props
        const { id } = this.props.reduxState.viewCustomer

        return (
            <Paper className={classNames(classes.root, classes.viewInfoContainer, { [classes.paperIsActive]: this.props.reduxState.infoView.view === 1 })}>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant='h5' align='center'>Customers</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.searchPadding}>
                        <TextField
                            fullWidth
                            id="filled-search"
                            label="Search"
                            type="search"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        {this.props.reduxState.customersData.length > 0 && this.props.reduxState.customersData.map(customer => {
                            return (
                                <Grid item xs={12} sm={12} key={customer.id} className={classes.gridPad}>
                                    <div className={classes.divContainer} onClick={() => this.handleSelectCustomer(customer.id)}>
                                        <Grid container>
                                        <Grid item xs={12} sm={4}>
                                            <Typography className={classes.divContent}>First Name: {customer.first_name}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Typography className={classes.divContent}>Last Name: {customer.last_name}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Typography className={classes.divContent}>Phone: {customer.phone}</Typography>
                                        </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}
const styles = theme => ({
    root: {
        width: '100%',
    },
    viewInfoContainer: {
        minHeight: theme.spacing.unit * 30,
        padding: theme.spacing.unit * 2,
        position: 'relative',
    },
    dialogTextField: {
        marginTop: theme.spacing.unit - 3,
        marginBottom: theme.spacing.unit - 8,
    },
    paperIsActive: {
        marginBottom: theme.spacing.unit * 3,
    },
    infoFab: {
        position: 'absolute',
        top: theme.spacing.unit * .5,
        right: theme.spacing.unit * 2,
        transform: `scale(${theme.spacing.unit * .1})`,
    },
    infoCancel: {
        position: 'absolute',
        top: theme.spacing.unit * .5,
        right: theme.spacing.unit * 10,
        transform: `scale(${theme.spacing.unit * .1})`,
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
    },
    divContent: {
        padding: '18.5px 14px',
    },
    gridPad: {
        paddingTop: theme.spacing.unit - 3,
        paddingBottom: theme.spacing.unit - 3,
    }
})

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(ViewAllCustomers));