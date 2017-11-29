import {
  takeLatest,
  call,
  put
} from 'redux-saga/effects'
import {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure
} from '../actions/users'
import { getUserFollowers } from '../api'

export function* fetchFollowersSaga ({ payload }) {
  try {
    const followers = yield call(getUserFollowers, payload)
    yield put(fetchFollowersSuccess(followers))
  } catch (error) {
    yield put(fetchFollowersFailure(error))
  }
}

export function* fetchFollowersWatch () {
  yield takeLatest(fetchFollowersRequest, fetchFollowersSaga)
}
