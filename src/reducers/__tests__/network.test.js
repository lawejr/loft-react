import network from '../network'
import {
  clearNetworkErrors, networkError
} from '../../actions/network'

describe('Reducer network', () => {
  describe('экшен clearNetworkErrors', () => {
    it('очищает поле error', () => {
      const next = network({ error: {} }, clearNetworkErrors())

      expect(next.error).toBeNull()
    })

    it('очищает поле message', () => {
      const next = network({ message: 'Тестовая ошибка' }, clearNetworkErrors())

      expect(next.message).toBe(null)
    })
  })

  describe('экшен networkError', () => {
    const testActionWithError = {
      response: {
        data: {
          message: 'тестовое сообщение'
        }
      }
    }

    it('заполненяет поле error объектом ошибки', () => {
      const next = network({ error: null }, networkError(testActionWithError))

      expect(next.error).toEqual(testActionWithError)
    })

    it('заполняет поле message, сообщением из соответствующего поле в объекте ошибки', () => {
      const next = network({ message: null }, networkError(testActionWithError))

      expect(next.message).toEqual(testActionWithError.response.data.message)
    })
  })
})
