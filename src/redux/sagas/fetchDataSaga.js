import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchFeature() { // getting customers and vehicles
  try {
    const setFeature = yield axios.get('/api/public/feature');
    yield put({ type: 'SET_FEATURE', payload: setFeature.data[0] })
  } catch (error) {
    console.log('Error with fetching feature:', error);
  }
}

function* fetchData() { // getting customers and vehicles
  try {
    const setData = yield axios.get('/api/manage'); // set customers data
    const setVehiclesData = yield axios.get('/api/manage/vehicles') // set vehicles data
    yield put({ type: 'SET_DATA', payload: setData.data }) // set customers data to reducer
    yield put({ type: 'SET_VEHICLES_DATA', payload: setVehiclesData.data }) // set vehicles data to reducer
  } catch (error) {
    console.log('Error with fetching data:', error);
  }
}

function* fetchSearch(action) { // getting searched customers
  try {
    const setSearchData = yield axios.get(`/api/manage/search/${action.payload}`); // get search data
    yield put({ type: 'SET_DATA', payload: setSearchData.data }) // set search data to reducer
  } catch (error) {
    console.log('Error with fetching search data:', error);
  }
}

function* fetchDataCustomer(action) {
  try {
    const setDataCustomer = yield axios.get(`/api/manage/get/customer/${action.payload}`); // get customer info
    yield put({ type: 'SET_VIEW_CUSTOMER', payload: setDataCustomer.data[0] }); // store customer info
  } catch (error) {
    console.log('Error with fetching customer:', error);
  }
}

function* fetchDataVehicle(action) {
  try {
    const setDataVehicle = yield axios.get(`/api/manage/get/vehicle/${action.payload}`); // get vehicle by id
    const setDataVehicleReceipts = yield axios.get(`/api/manage/get/vehicle/${action.payload}/receipts`); // get vehicle receipts
    yield put({ type: 'SET_VIEW_VEHICLE', payload: setDataVehicle.data[0] }); // store vehicle info 
  } catch (error) {
    console.log('Error with fetching vehicle:', error);
  }
}

function* fetchDataReceipts(action) {
  try {
    const setDataReceipts = yield axios.get(`/api/manage/get/receipt/${action.payload}`); // get receipts by id
    yield put({ type: 'SET_VIEW_RECEIPT', payload: setDataReceipts.data[0] }); // store receipts info
  } catch (error) {
    console.log('Error with fetching receipts:', error);
  }
}

function* fetchServices() {
  try {
    const setServices = yield axios.get(`/api/public/services`); // get services
    yield put({ type: 'SET_SERVICES', payload: setServices.data }); // store services info
  } catch (error) {
    console.log('Error with fetching service:', error);
  }
}


function* fetchDataSagaWatcher() {
  yield takeLatest('FETCH_FEATURE', fetchFeature);

  // fetch customers
  yield takeLatest('FETCH_DATA', fetchData);

  // fetch a customer
  yield takeLatest('FETCH_DATA_CUSTOMER', fetchDataCustomer);

  // fetch a vehicle
  yield takeLatest('FETCH_DATA_VEHICLE', fetchDataVehicle);

  // fetch all receipt
  yield takeLatest('FETCH_DATA_RECEIPT', fetchDataReceipts)

  // fetch services
  yield takeLatest('FETCH_SERVICES', fetchServices)

  // fetch search
  yield takeLatest('FETCH_SEARCH', fetchSearch);

}

export default fetchDataSagaWatcher;
