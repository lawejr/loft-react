import { handleActions } from 'redux-actions'
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure
} from '../actions/users'

export default handleActions({
    [fetchUserRequest]: (state, { payload }) => ({
      ...state,
      isFetching: true,
      login: payload,
      data: null
    }),
    [fetchUserSuccess]: (state, { payload }) => ({
      ...state,
      isFetching: false,
      isFetched: true,
      data: payload
    }),
    [fetchUserFailure]: (state) => ({
      ...state,
      isFetching: false,
      isFetched: true
    })
  },
  {
    isFetching: false,
    isFetched: false,
    login: null,
    data: null
  }
)

export const getUserData = (state) => state.users.data
export const getIsFetching = (state) => state.users.isFetching