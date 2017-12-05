import {
  fetchUserSuccess, fetchUserFailure,
  fetchTokenOwnerRequest
} from '../../actions/users'
import { call, put } from 'redux-saga/effects'
import { fetchUserSaga } from '../users'
import requestFlow from '../request'
import { getTokenOwner, getUserInformation } from '../../api'

describe('Saga users:', () => {
  it('call getTokenOwner if action is fetchTokenOwnerRequest', () => {
    const action = fetchTokenOwnerRequest('test_login')
    const saga = fetchUserSaga(action)

    expect(saga.next().value).toEqual(call(requestFlow, getTokenOwner, 'test_login'))
  })

  it('call getUserInformation if action is fetchUserRequest', () => {
    const action = { payload: 'test_login' }
    const saga = fetchUserSaga(action)

    expect(saga.next().value).toEqual(call(requestFlow, getUserInformation, 'test_login'))
  })

  it('dispatch action fetchUserSuccess with user from call on success call', () => {
    const action = { payload: 'test_login' }
    const user = {
      login: 'test',
      id: '1'
    }
    const saga = fetchUserSaga(action)

    saga.next()
    expect(saga.next(user).value).toEqual(put(fetchUserSuccess(user)))
  })

  it('dispatch action fetchUserFailure with user from call on success call', () => {
    const action = { payload: 'test_login' }
    const error = new Error('test error')
    const saga = fetchUserSaga(action)

    saga.next()
    expect(saga.throw(error).value).toEqual(put(fetchUserFailure(error)))
  })
})
