import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addDataCustomer(action) {
  try {
    yield axios.post(`/api/manage/add/customer/`, action.payload);
    yield put({type: 'CLEAR_NEW_CUSTOMER'});
    yield put({type: 'FETCH_DATA'});
  } catch (error) {
      console.log('Error with adding customer:', error);
  }
}

function* addDataVehicle(action) {
  try {
    yield axios.post(`/api/manage/add/vehicle/`, action.payload);
    yield put({type: 'CLEAR_NEW_VEHICLE'});
    yield put({type: 'FETCH_DATA_CUSTOMER', payload: action.payload.customer_id}); // refresh customer info after redirect
    yield put({type: 'FETCH_DATA'});
  } catch (error) {
      console.log('Error with adding vehicle:', error);
  }
}

function* addDataSagaWatcher() { // listen to what to add
  yield takeLatest('ADD_CUSTOMER', addDataCustomer);
  yield takeLatest('ADD_VEHICLE', addDataVehicle);
}

export default addDataSagaWatcher;
