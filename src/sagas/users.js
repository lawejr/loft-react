import {
  takeLatest,
  call,
  put
} from 'redux-saga/effects'
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure
} from '../actions/users'
import { getUserInformation } from '../api'

export function* fetchUserSaga ({ payload }) {
  try {
    const userData = yield call(getUserInformation, payload)
    yield put(fetchUserSuccess(userData))
  } catch (error) {
    yield put(fetchUserFailure(error))
  }
}

export function* fetchUserWatch () {
  yield takeLatest(fetchUserRequest, fetchUserSaga)
}
