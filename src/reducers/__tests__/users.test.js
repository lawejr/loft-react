import users from '../users'
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure
} from '../../actions/users'

describe('Reducer users', () => {
  describe('экшен fetchUserRequest', () => {
    it('изменяет флаг isFetching на true', () => {
      const next = users({ isFetching: false }, fetchUserRequest())

      expect(next.isFetching).toBeTruthy()
    })

    it('очищает поле data', () => {
      const next = users({ data: {} }, fetchUserRequest())

      expect(next.data).toBe(null)
    })

    it('очищает поле error', () => {
      const next = users({ error: {} }, fetchUserRequest())

      expect(next.error).toBe(null)
    })
  })

  describe('экшен fetchUserSuccess', () => {
    it('изменяет флаг isFetching на false', () => {
      const next = users({ isFetching: true }, fetchUserSuccess())

      expect(next.isFetching).toBeFalsy()
    })

    it('изменяет флаг isFetched на true', () => {
      const next = users({ isFetched: false }, fetchUserSuccess())

      expect(next.isFetched).toBeTruthy()
    })

    it('заполняет поле data полученными данными', () => {
      const testPayload = 'user'
      const next = users(null, fetchUserSuccess(testPayload))

      expect(next.data).toEqual(testPayload)
    })

    it('очищает поле error', () => {
      const next = users({ error: {} }, fetchUserSuccess())

      expect(next.error).toBe(null)
    })
  })

  describe('экшен fetchUserFailure', () => {
    it('изменяет флаг isFetching на false', () => {
      const next = users({ isFetching: true }, fetchUserFailure())

      expect(next.isFetching).toBeFalsy()
    })

    it('изменяет флаг isFetched на true', () => {
      const next = users({ isFetched: false }, fetchUserFailure())

      expect(next.isFetched).toBeTruthy()
    })

    it('очищает поле data', () => {
      const next = users({ data: {} }, fetchUserFailure())

      expect(next.data).toBe(null)
    })

    it('заполняет поле error ошибкой', () => {
      const testError = new Error('test fail')
      const next = users(null, fetchUserFailure(testError))

      expect(next.error).toBeTruthy()
    })
  })
})