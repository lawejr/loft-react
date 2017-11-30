import { fork } from 'redux-saga/effects'
import { authFlow } from './auth'
import { fetchUserWatch } from './users'
import {fetchFollowersWatch} from './followers'
// import {fetchUserReposWatch} from './repos'

export default function* () {
  yield fork(authFlow)
  yield fork(fetchFollowersWatch)
  yield fork(fetchUserWatch)
  // yield fork(fetchUserReposWatch)
}
