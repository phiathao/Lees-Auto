import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';

import featureService from './featureServiceReducer';
import services from './servicesReducer';
import header from './headerReducer';
import drawer from './drawerReducer';

import customersData from './customersReducer';
import infoView from './viewInfoReducer';

import viewCustomer from './viewCustomerReducer';
import viewVehicle from './viewVehicleReducer';
import viewReceipt from './viewReceiptReducer';

import newCustomer from './newCustomerReducer';
import newVehicle from './newVehicleReducer';
import newReceipt from './newReceiptReducer';

import vehicleReceipts from './vehicleReceiptsReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in

  header, // header navigation
  drawer, // admin drawer navigation
  featureService, //
  services, // 

  customersData, // admin handle customers, vehicles
  infoView, // admin view info @ manage customers page

  newCustomer, // admin adding customer
  newVehicle, // adding new vehicle to customer
  newReceipt, // adding vehicle a receipt

  vehicleReceipts, // vehicle receipts
  
  viewCustomer, // admin who to view
  viewReceipt,
  viewVehicle, // viewing the vehicle

});

export default rootReducer;
