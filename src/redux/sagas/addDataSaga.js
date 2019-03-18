import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addDataCustomer(action) {
  try {
    yield axios.post(`/api/manage/add/customer/`, action.payload);
    yield put({type: 'FETCH_DATA'});
  } catch (error) {
      console.log('Error with adding customer:', error);
  }
}

function* addDataVehicle(action) {
  try {
    yield axios.post(`/api/manage/add/vehicle/`, action.payload);
    yield put({type: 'FETCH_DATA'});
  } catch (error) {
      console.log('Error with adding vehicle:', error);
  }
}

function* addDataReceipt(action) {
  try {
    yield axios.post(`/api/manage/add/receipt/`, action.payload);
    yield put({type: 'FETCH_DATA'});
  } catch (error) {
      console.log('Error with adding receipt:', error);
  }
}

function* addDataSagaWatcher() { // listen to what to add
  yield takeLatest('ADD_CUSTOMER', addDataCustomer);
  yield takeLatest('ADD_VEHICLE', addDataVehicle);
  yield takeLatest('ADD_RECEIPT', addDataReceipt);
}

export default addDataSagaWatcher;
