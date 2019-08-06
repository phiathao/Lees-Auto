import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';

import Appointments from '../Content/Appointments';
import Customers from '../Content/Customers';
import Sales from '../Content/Sales';
import Services from '../Content/Services';
import Incomes from '../Content/Incomes';
import CustomerTable from '../CustomerTable/CustomerTable';

class ManageDrawer extends React.Component {
    state = {
        open: false,
    };
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleBack = () => {
        if (this.props.reduxState.infoView === 0) {
            this.props.dispatch({
                type: 'SET_DRAWER_BACK'
            });
            this.props.history.push('/manage')
        } else if (this.props.reduxState.infoView === 1) {
            this.props.dispatch({
                type: 'INFO_TO_VIEW',
                payload: 0,
            });
            this.props.dispatch({
                type: 'CLEAR_CUSTOMER',
            });
        } else if (this.props.reduxState.infoView === 2) {
            this.props.dispatch({
                type: 'INFO_TO_VIEW',
                payload: 1,
            });
            this.props.dispatch({
                type: 'CLEAR_VEHICLE',
            });
        } else if (this.props.reduxState.infoView === 3) {
            this.props.dispatch({
                type: 'INFO_TO_VIEW',
                payload: 2,
            });
            this.props.dispatch({
                type: 'CLEAR_RECEIPT',
            });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Drawer
                    variant="permanent"
                    className={classes.drawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    {this.props.reduxState.drawer === 0 &&
                        <List>
                            <ListItem
                                button
                                selected={this.props.reduxState.drawer === 1}
                                onClick={() => { this.props.dispatch({ type: 'SET_DRAWER_APPOINTMENTS' }); this.props.history.push('/manage') }}
                            >
                                <ListItemText
                                    primary="Appointment"
                                    inset
                                />
                            </ListItem>
                            <ListItem
                                button
                                selected={this.props.reduxState.drawer === 2 || this.props.reduxState.drawer === 6}
                                onClick={() => { this.props.dispatch({ type: 'SET_DRAWER_CUSTOMERS' }); this.props.history.push('/manage/customers') }}
                            >
                                <ListItemText
                                    primary="Customers"
                                    inset
                                />
                            </ListItem>
                            {/* <ListItem
                                button
                                selected={this.props.reduxState.drawer === 3}
                                onClick={() => { this.props.dispatch({ type: 'SET_DRAWER_SERVICES' }); this.props.history.push('/manage/services') }}
                            >
                                <ListItemText
                                    primary="Services"
                                    inset
                                />
                            </ListItem>
                            <ListItem
                                button
                                selected={this.props.reduxState.drawer === 4}
                                onClick={() => { this.props.dispatch({ type: 'SET_DRAWER_SALES' }); this.props.history.push('/manage/sales') }}
                            >
                                <ListItemText
                                    primary="Cars For Sales"
                                    inset
                                />
                            </ListItem>
                            <ListItem
                                button
                                selected={this.props.reduxState.drawer === 5}
                                onClick={() => { this.props.dispatch({ type: 'SET_DRAWER_INCOMES' }); this.props.history.push('/manage/incomes') }}
                            >
                                <ListItemText
                                    primary="Income"
                                    inset
                                />
                            </ListItem> */}
                        </List>
                    }
                    {this.props.reduxState.drawer !== 0 &&
                        <>
                            <List>
                                <ListItem
                                    button
                                    onClick={this.handleBack}
                                >
                                    <ListItemIcon>
                                        <ArrowBackIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Go Back"
                                        inset
                                    />
                                </ListItem>
                            </List>
                            <Divider />
                        </>
                    }
                    {this.props.reduxState.drawer === 2 &&
                        <List>
                            <TextField
                                fullWidth
                                id="filled-search"
                                label="Search"
                                type="search"
                                margin="normal"
                                variant="filled"
                            />
                            <CustomerTable />
                        </List>
                    }
                </Drawer>
                <main className={classes.content}>
                    {this.props.reduxState.drawer === 1 || 0 ? <Appointments />
                        : this.props.reduxState.drawer === 2 ? <Customers />
                            : this.props.reduxState.drawer === 3 ? <Services />
                                : this.props.reduxState.drawer === 4 ? <Sales />
                                    : this.props.reduxState.drawer === 5 && <Incomes />
                    }
                </main>
            </div>
        );
    }
}
const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
        minHeight: '100%',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 6,
    },
    toolbar: {
        ...theme.mixins.toolbar,
    },
    searchField: {
        width: '100%',
    },
});

const mapStateToProps = reduxState => ({
    reduxState,
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ManageDrawer)));