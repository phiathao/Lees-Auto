import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import customersData from './customersReducer';
import newCustomer from './newCustomerReducer';
import viewCustomer from './viewCustomerReducer';
import customerVehicles from './customerVehiclesReducer';
import newVehicle from './newVehicleReducer';
import viewVehicle from './vehicleReducer';
import vehicleReceipts from './vehicleReceiptsReducer';
import newReceipt from './newReceiptReducer';
import featureService from './featureServiceReducer';
import services from './servicesReducer';
import viewReceipt from './viewReceipt';
import header from './headerReducer';
import drawer from './drawerReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  featureService, //
  services, // 
  customersData, // admin handle customers, vehicles
  newCustomer, // admin adding customer
  viewCustomer, // admin who to view
  customerVehicles, // customer vehicles
  newVehicle, // adding new vehicle to customer
  viewVehicle, // viewing the vehicle
  vehicleReceipts, // vehicle receipts
  newReceipt, // adding vehicle a receipt
  viewReceipt,
  header, // header navigation
  drawer, // admin drawer navigation
});

export default rootReducer;
