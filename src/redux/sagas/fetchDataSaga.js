import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchFeature() { // getting customers and vehicles
  try {
    const setFeature = yield axios.get('/api/public/feature');
    console.log(setFeature.data);
    yield put({type: 'SET_FEATURE', payload: setFeature.data[0]})
  } catch (error) {
      console.log('Error with fetching feature:', error);
  }
}

function* fetchData() { // getting customers and vehicles
  try {
    const setData = yield axios.get('/api/manage');
    yield put({type: 'SET_DATA', payload: setData.data})
  } catch (error) {
      console.log('Error with fetching data:', error);
  }
}

function* fetchDataCustomer(action){
  try {
    const setDataCustomer = yield axios.get(`/api/manage/get/customer/${action.payload}`); // get customer info
    const setDataCustomerVehicles = yield axios.get(`/api/manage/get/customer/${action.payload}/vehicles`); // get customer cars
    yield put({type: 'SET_VIEW_CUSTOMER', payload: setDataCustomer.data[0]}); // store customer info
    yield put({type: 'SET_CUSTOMER_VEHICLES', payload: setDataCustomerVehicles.data}); // store customer vehicle
  } catch (error) {
      console.log('Error with fetching customer:', error);
  }
}

function* fetchDataVehicle(action){
  try {
    console.log(action.payload);
    const setDataVehicle = yield axios.get(`/api/manage/get/vehicle/${action.payload}`); // get vehicle by id
    const setDataVehicleReceipts = yield axios.get(`/api/manage/get/vehicle/${action.payload}/receipts`); // get vehicle receipts
    yield put({type: 'SET_VIEW_VEHICLE', payload: setDataVehicle.data[0]}); // store vehicle info
    yield put({type: 'SET_VEHICLE_RECEIPTS', payload: setDataVehicleReceipts.data}); // store vehicle receipts    
  } catch (error) {
      console.log('Error with fetching vehicle:', error);
  }
}


function* fetchDataSagaWatcher() {
  yield takeLatest('FETCH_FEATURE', fetchFeature);
  yield takeLatest('FETCH_DATA', fetchData);
  yield takeLatest('FETCH_DATA_CUSTOMER', fetchDataCustomer);
  yield takeLatest('FETCH_DATA_VEHICLE', fetchDataVehicle);
  // yield takeLatest('FETCH_DATA_RECEIPT', fetchDataReceipts)

}

export default fetchDataSagaWatcher;
