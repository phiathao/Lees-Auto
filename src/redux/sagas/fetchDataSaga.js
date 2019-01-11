import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchData() {
  try {
    const setData = yield axios.get('/api/manage')
    yield put({type: 'SET_DATA', payload: setData.data})
  } catch (error) {
      console.log('Error with fetching data:', error);
  }
}

function* fetchDataCustomer(action){
  try {
    const setDataCustomer = yield axios.get(`/api/manage/customer/${action.payload}`);
    yield put({type: 'SET_VIEW_CUSTOMER', payload: setDataCustomer.data[0]});
    yield put({type: 'SET_EDIT_CUSTOMER', payload: setDataCustomer.data[0]});
  } catch (error) {
      console.log('Error with fetching data:', error);
  }
}

function* fetchDataSagaWatcher() {
  yield takeLatest('FETCH_DATA', fetchData);
  yield takeLatest('FETCH_DATA_CUSTOMER', fetchDataCustomer);
}

export default fetchDataSagaWatcher;
