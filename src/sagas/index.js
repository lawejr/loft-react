import { fork } from 'redux-saga/effects'
import { setTokenWatch } from './auth'
import { fetchUserWatch } from './users'
import {fetchFollowersWatch} from './followers'
// import {fetchUserReposWatch} from './repos'

export default function* () {
  yield fork(setTokenWatch)
  yield fork(fetchFollowersWatch)
  yield fork(fetchUserWatch)
  // yield fork(fetchUserReposWatch)
}
