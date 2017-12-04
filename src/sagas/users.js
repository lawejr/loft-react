import {
  takeLatest,
  call,
  put
} from 'redux-saga/effects'
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  fetchTokenOwnerRequest
} from '../actions/users'
import requestFlow from './request'
import { getUserInformation, getTokenOwner } from '../api'

export function* fetchUserSaga (action) {
  try {
    let response
    if (fetchTokenOwnerRequest.toString() === action.type) {
      response = yield call(requestFlow, getTokenOwner, action.payload)
    } else {
      response = yield call(requestFlow, getUserInformation, action.payload)
    }
    yield put(fetchUserSuccess(response))
  } catch (error) {
    yield put(fetchUserFailure(error))
  }
}

export function* fetchUserWatch () {
  yield takeLatest([fetchUserRequest, fetchTokenOwnerRequest], fetchUserSaga)
}
