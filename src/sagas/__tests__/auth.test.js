import { call, put } from 'redux-saga/effects'
import { setTokenSaga } from '../auth'
import { setToken } from '../../actions/auth'
import { setTokenToApi } from '../../api'

describe('Saga auth', () => {
  it('вызывает setTokenToApi', () => {
    const testToken = 'test_token'
    const action = { payload: testToken }
    const saga = setTokenSaga(action)

    expect(saga.next().value).toEqual(call(setTokenToApi, testToken))
  })
})
