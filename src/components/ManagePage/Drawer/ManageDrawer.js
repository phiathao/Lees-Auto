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
import ManageContent from '../Content/Manage';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';



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
        const { classes, theme } = this.props;

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
                        <TextField
                            id="filled-search"
                            label="Search"
                            type="search"
                            className={classes.searchField}
                            margin="normal"
                            variant="standard"
                        />
                    </List>
                    <Divider />
                    <List>
                        <ListItem button>
                            {/* <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon> */}
                            <ListItemText
                                primary="Add Customer"
                            />
                        </ListItem>
                    </List>
                </Drawer>
                <main>
                    <ManageContent />
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
    },
    toolbar: {
        ...theme.mixins.toolbar,
    },
    searchField: {
        width: '100%',
    },
});


export default withStyles(styles)(ManageDrawer);