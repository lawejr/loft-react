import { handleActions } from 'redux-actions'
import { authorize, logout } from '../actions/auth'

export default handleActions(
  {
    [authorize]: () => ({ isAuthorized: true }),
    [logout]: () => ({ isAuthorized: false })
  },
  {
    isAuthorized: false
  }
)

export const getIsAuthorized = state => state.auth.isAuthorized
