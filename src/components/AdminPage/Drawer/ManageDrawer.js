import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import FolderIcon from '@material-ui/icons/Folder';
// import Styles from '../../Styles/Styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import { connect } from 'react-redux';

import Appointments from '../Content/Appointments';
import Customers from '../Content/Customers';
import Sales from '../Content/Sales';
import Services from '../Content/Services';
import Incomes from '../Content/Incomes';

import VehiclePage from '../Vehicle/Vehicle';
import CustomerPage from '../Customer/Customer';
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute';



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
                    <List>
                        <ListItem
                            button
                            selected={this.props.reduxState.drawer === 1}
                            onClick={() => { this.props.dispatch({ type: 'SET_DRAWER_APPOINTMENTS' }) }}
                        >
                            <ListItemText
                                primary="Appointment"
                                inset
                            />
                        </ListItem>
                        <ListItem
                            button
                            selected={this.props.reduxState.drawer === 2 || this.props.reduxState.drawer === 6}
                            onClick={() => { this.props.dispatch({ type: 'SET_DRAWER_CUSTOMERS' }) }}
                        >
                            <ListItemText
                                primary="Customers"
                                inset
                            />
                        </ListItem>
                        <ListItem
                            button
                            selected={this.props.reduxState.drawer === 3}
                            onClick={() => { this.props.dispatch({ type: 'SET_DRAWER_SERVICES' }) }}
                        >
                            <ListItemText
                                primary="Services"
                                inset
                            />
                        </ListItem>
                        <ListItem
                            button
                            selected={this.props.reduxState.drawer === 4}
                            onClick={() => { this.props.dispatch({ type: 'SET_DRAWER_SALES' }) }}
                        >
                            <ListItemText
                                primary="Cars Sales"
                                inset
                            />
                        </ListItem>
                        <ListItem
                            button
                            selected={this.props.reduxState.drawer === 5}
                            onClick={() => { this.props.dispatch({ type: 'SET_DRAWER_INCOMES' }) }}
                        >
                            {/* <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon> */}
                            <ListItemText
                                primary="Income"
                                inset
                            />
                        </ListItem>
                    </List>
                    <Divider />
                </Drawer>
                <main className={classes.content}>
                    {this.props.reduxState.drawer === 1 ? <Appointments />
                        : this.props.reduxState.drawer === 2 ? <Customers />
                            : this.props.reduxState.drawer === 3 ? <Services />
                                : this.props.reduxState.drawer === 4 ? <Sales />
                                    : this.props.reduxState.drawer === 5 ? <Incomes />
                                        : this.props.reduxState.drawer === 6 ? <ProtectedRoute
                                            path="/manage/vehicle/:id"
                                            component={VehiclePage}
                                        />
                                            : this.props.reduxState.drawer === 7 && <ProtectedRoute
                                                path="/manage/customer/:id"
                                                component={CustomerPage}
                                            />
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
        padding: theme.spacing.unit * 3,
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

export default connect(mapStateToProps)(withStyles(styles)(ManageDrawer));