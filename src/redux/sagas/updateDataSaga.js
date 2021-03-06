import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updateDataCustomer(action) {
  try {
    yield axios.put(`/api/manage/put/customer/`, action.payload);
    yield put({type: 'FETCH_DATA'});
  } catch (error) {
      console.log('Error with updating customer:', error);
  }
}
function* updateDataVehicle(action) {
  try {
    yield axios.put(`/api/manage/put/vehicle/`, action.payload);
    yield put({type: 'FETCH_DATA'});
  } catch (error) {
      console.log('Error with updating vehicle:', error);
  }
}
function* updateDataReceipt(action) {
  try {
    yield axios.put(`/api/manage/put/receipt/`, action.payload);
    yield put({type: 'FETCH_DATA'});
  } catch (error) {
      console.log('Error with updating receipt:', error);
  }
}


function* addDataSagaWatcher() { // listen to what to add
  yield takeLatest('UPDATE_CUSTOMER', updateDataCustomer);
  yield takeLatest('UPDATE_VEHICLE', updateDataVehicle);
  yield takeLatest('UPDATE_RECEIPT', updateDataReceipt);
}

export default addDataSagaWatcher;
