import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// component
import Header from '../Header/Header';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import CarListPage from '../CarList/CarList';
import HomePage from '../HomePage/HomePage';
import Contact from '../Contact/Contact';
import ManagePage from '../AdminPage/AdminPage';
import LoginPage from '../LoginPage/LoginPage';
import ServicesAll from '../ServicesAll/ServicesAll';
import Error from '../Error/404';

class App extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div className={classes.height100}>
          <CssBaseline />
          <Header />
          <Switch>

            <Redirect exact from="/" to="/login" />

            {/* <Route
              exact
              path="/about"
              component={AboutPage}
            />
            <Route
              exact
              path="/services"
              component={ServicesAll}
            />
            <Route
              exact
              path="/carList"
              component={CarListPage}
            />
            <Route
              exact
              path="/contact"
              component={Contact}
            /> */}
            <Route
              exact
              path="/login"
              component={LoginPage}
            />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}

            {/* <Route
              exact
              path="/home"
              component={HomePage}
            /> */}

            <ProtectedRoute
              path="/manage"
              component={ManagePage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <Error />} />
          </Switch>

        </div>
      </Router>
    )
  }
}

const styles = theme => ({
  height100: {
    height: '100vh',
  }
});

export default connect()(withStyles(styles)(App));
