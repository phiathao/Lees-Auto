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

function* fetchDataSagaWatcher() {
  yield takeLatest('FETCH_DATA', fetchData);
}

export default fetchDataSagaWatcher;
