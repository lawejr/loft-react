import followers from '../followers'
import {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure
} from '../../actions/users'

describe('Reducer followers', () => {
  describe('экшен fetchFollowersRequest', () => {
    it('изменяет флаг isFetching на true', () => {
      const next = followers({ isFetching: false }, fetchFollowersRequest())

      expect(next.isFetching).toBeTruthy()
    })

    it('очищает поле data', () => {
      const next = followers({ data: {} }, fetchFollowersRequest())

      expect(next.data).toBe(null)
    })

    it('очищает поле error', () => {
      const next = followers({ error: {} }, fetchFollowersRequest())

      expect(next.error).toBe(null)
    })
  })

  describe('экшен fetchFollowersSuccess', () => {
    const testPayload = { data: 'user' }

    it('изменяет флаг isFetching на false', () => {
      const next = followers({ isFetching: true }, fetchFollowersSuccess(testPayload))

      expect(next.isFetching).toBeFalsy()
    })

    it('изменяет флаг isFetched на true', () => {
      const next = followers({ isFetched: false }, fetchFollowersSuccess(testPayload))

      expect(next.isFetched).toBeTruthy()
    })

    it('заполняет поле data полученными данными', () => {
      const next = followers(null, fetchFollowersSuccess(testPayload))

      expect(next.data).toEqual(testPayload.data)
    })

    it('очищает поле error', () => {
      const next = followers({ error: {} }, fetchFollowersSuccess(testPayload))

      expect(next.error).toBe(null)
    })
  })

  describe('экшен fetchFollowersFailure', () => {
    it('изменяет флаг isFetching на false', () => {
      const next = followers({ isFetching: true }, fetchFollowersFailure())

      expect(next.isFetching).toBeFalsy()
    })

    it('изменяет флаг isFetched на true', () => {
      const next = followers({ isFetched: false }, fetchFollowersFailure())

      expect(next.isFetched).toBeTruthy()
    })

    it('очищает поле data', () => {
      const next = followers({ data: {} }, fetchFollowersFailure())

      expect(next.data).toBe(null)
    })

    it('заполняет поле error ошибкой', () => {
      const testError = new Error('test fail')
      const next = followers(null, fetchFollowersFailure(testError))

      expect(next.error).toBeTruthy()
    })
  })
})
