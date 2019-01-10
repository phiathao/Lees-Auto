import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addDataCustomer(action) {
  try {
    yield axios.post(`/api/manage/add/customer/`, action.payload)
    yield put({type: 'FETCH_DATA'})
  } catch (error) {
      console.log('Error with adding customer:', error);
  }
}


function* addDataSagaWatcher() { // listen to what to add
  yield takeLatest('ADD_CUSTOMER', addDataCustomer);
}

export default addDataSagaWatcher;
