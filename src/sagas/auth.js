import { call, takeLatest } from 'redux-saga/effects'
import { setToken } from '../actions/auth'
import { setTokenToApi } from '../api'

export function* setTokenSaga ({ payload }) {
  yield call(setTokenToApi, payload)
}

export function* setTokenWatch () {
  yield takeLatest(setToken, setTokenSaga)
}
