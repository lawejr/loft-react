import { handleActions } from 'redux-actions'
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure
} from '../actions/users'

export default handleActions(
  {
    [fetchUserRequest]: (state, { payload }) => ({
      ...state,
      isFetching: true,
      login: payload,
      data: null,
      error: null
    }),
    [fetchUserSuccess]: (state, { payload }) => ({
      ...state,
      isFetching: false,
      isFetched: true,
      data: payload.data,
      error: null
    }),
    [fetchUserFailure]: (state, { error }) => ({
      ...state,
      isFetching: false,
      isFetched: true,
      data: null,
      error: error
    })
  },
  {
    isFetching: false,
    isFetched: false,
    login: null,
    data: null
  }
)

export const getUserData = state => state.users.data
export const getUserIsFetching = state => state.users.isFetching
