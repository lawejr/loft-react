import { logout } from '../../actions/auth'
import { networkError, clearNetworkErrors } from '../../actions/network'
import { call, put } from 'redux-saga/effects'
import requestSage from '../request'

describe('Saga request', () => {
  it('должна вызывать переданную фукнкцию с аргументами', () => {
    const mockFn = jest.fn()
    const testArgs = 'test'
    const saga = requestSage(mockFn, testArgs)

    expect(saga.next().value).toEqual(call(mockFn, testArgs))
  })
  it('если нет ошибки должна вызывать clearNetworkErrors', () => {
    const mockFn = jest.fn()
    const testArgs = 'test'
    const saga = requestSage(mockFn, testArgs)

    saga.next()
    saga.next()
    expect(saga.next(true).value).toEqual(put(clearNetworkErrors()))
  })
  it('если есть ошибка вызывает networkError', () => {
    const mockFn = jest.fn()
    const testArgs = 'test'
    const testError = new Error('test error')
    const saga = requestSage(mockFn, testArgs)

    saga.next()
    expect(saga.throw(testError).value).toEqual(put(networkError(testError)))
  })
  it('если код ошибки 401 вызывает logout', () => {
    const mockFn = jest.fn()
    const testArgs = 'test'
    const saga = requestSage(mockFn, testArgs)

    saga.next()
    saga.throw({
      response: {
        status: 401
      }
    })
    expect(saga.next().value).toEqual(put(logout()))
  })
})
