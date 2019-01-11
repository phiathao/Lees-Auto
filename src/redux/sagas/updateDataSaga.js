import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updateDataCustomer(action) {
  try {
    yield axios.put(`/api/manage/put/customer/`, action.payload);
    yield put({type: 'FETCH_DATA'});
    yield put({type: 'FETCH_DATA_CUSTOMER'});
  } catch (error) {
      console.log('Error with adding customer:', error);
  }
}


function* addDataSagaWatcher() { // listen to what to add
  yield takeLatest('UPDATE_CUSTOMER', updateDataCustomer);
}

export default addDataSagaWatcher;
