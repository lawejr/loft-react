import { fork } from 'redux-saga/effects'
import { setTokenWatch } from './auth'
import { fetchUserWatch } from './users'
// import {fetchUserReposWatch} from './repos'
// import {fetchFollowersWatch} from './followers'

export default function* () {
  yield fork(setTokenWatch)
  yield fork(fetchUserWatch)
  // yield fork(fetchUserReposWatch)
  // yield fork(fetchFollowersWatch)
}
