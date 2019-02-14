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
import Paper from '@material-ui/core/Paper';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import AboutPage from '../AboutPage/AboutPage';
import CarListPage from '../CarList/CarList';
import HomePage from '../HomePage/HomePage';
import ManagePage from '../ManagePage/ManagePage';
import ShopServicesPage from '../ShopService/ShopService';
import CarSalesPage from '../CarSales/CarSalesPage';
import ManageAddCustomer from '../ManagePage/AddCustomer/AddCustomer';
import LoginPage from '../LoginPage/LoginPage';
import ManageCustomerPage from '../ManagePage/Customer/Customer';
import ManageAddVehicle from '../ManagePage/Customer/CustomerVehicle/AddVehicle/AddVehicle';
import ManageVehicle from '../ManagePage/Customer/CustomerVehicle/VehicleReceipts/VehicleReceipts';
import ManageAddReceipt from '../ManagePage/Customer/CustomerVehicle/VehicleReceipts/AddReceipts/AddReceipt';
import ServicesAll from '../ServicesAll/ServicesAll';
import Styles from '../Styles/Styles';

class App extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div>
        <CssBaseline />
          <Header/>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
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
              path="/login"
              component={LoginPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <Route
              exact
              path="/home"
              component={HomePage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/manage"
              component={ManagePage}
            />
            <ProtectedRoute
              exact
              path="/manage/customer"
              component={ManageCustomerPage}
            />
            <ProtectedRoute
              exact
              path="/manage/vehicle"
              component={ManageVehicle}
            />
            <ProtectedRoute
              exact
              path="/shopService"
              component={ShopServicesPage}
            />
            <ProtectedRoute
              exact
              path="/manage/vehicle/add"
              component={ManageAddVehicle}
            />
            <ProtectedRoute
              exact
              path="/manage/receipt/add"
              component={ManageAddReceipt}
            />
            <ProtectedRoute
              exact
              path="/manage/add"
              component={ManageAddCustomer}
            />
            <ProtectedRoute
              exact
              path="/carSales"
              component={CarSalesPage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default connect()(withStyles(Styles)(App));
