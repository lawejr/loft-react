import {
  fetchFollowersSuccess,
  fetchFollowersFailure
} from '../../actions/users'
import { call, put } from 'redux-saga/effects'
import { fetchFollowersSaga } from '../followers'
import { getUserFollowers } from '../../api'

describe('Saga followers', () => {
  it('call getUserFollowers', () => {
    const testLogin = 'test_login'
    const action = { payload: testLogin }
    const saga = fetchFollowersSaga(action)

    expect(saga.next().value).toEqual(call(getUserFollowers, testLogin))
  })

  it('dispatch action fetchFollowersSuccess with user from call on success call', () => {
    const action = { payload: 'test_login' }
    const followers = [{ id: '1' }, { id: '2' }, { id: '3' }]
    const saga = fetchFollowersSaga(action)

    saga.next()
    expect(saga.next(followers).value).toEqual(put(fetchFollowersSuccess(followers)))
  })

  it('dispatch action fetchFollowersFailure with user from call on success call', () => {
    const action = { payload: 'test_login' }
    const error = new Error('test error')
    const saga = fetchFollowersSaga(action)
    saga.next()
    expect(saga.throw(error).value).toEqual(put(fetchFollowersFailure(error)))
  })
})
