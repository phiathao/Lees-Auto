import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchData() { // getting customers and vehicles
  try {
    const setData = yield axios.get('/api/manage')
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
    yield put({type: 'SET_CUSTOMER_VEHICLES', payload: setDataCustomerVehicles.data}); // store customer cars
  } catch (error) {
      console.log('Error with fetching customer:', error);
  }
}

function* fetchDataVehicle(action){
  try {
    console.log(action.payload);
    const setDataVehicle = yield axios.get(`/api/manage/get/vehicle/${action.payload}`); // get vehicle by id
    yield put({type: 'SET_VIEW_VEHICLE', payload: setDataVehicle.data[0]}); // store customer info
  } catch (error) {
      console.log('Error with fetching vehicle:', error);
  }
}


function* fetchDataSagaWatcher() {
  yield takeLatest('FETCH_DATA', fetchData);
  yield takeLatest('FETCH_DATA_CUSTOMER', fetchDataCustomer);
  yield takeLatest('FETCH_DATA_VEHICLE', fetchDataVehicle);

}

export default fetchDataSagaWatcher;
