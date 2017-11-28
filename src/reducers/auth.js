import { handleActions } from 'redux-actions'
import { setToken } from '../actions/auth'

export default handleActions({
    [setToken]: (state, { payload }) => ({
      token: payload
    })
  },
  {
    token: null
  }
)

export const getToken = (state) => state.auth.token