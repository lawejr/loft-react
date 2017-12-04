import { handleActions } from 'redux-actions'
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure, fetchTokenOwnerRequest
} from '../actions/users'

export default handleActions(
  {
    [fetchTokenOwnerRequest]: (state) => ({
      ...state,
      isFetching: true,
      data: null,
      error: null
    }),
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
      data: payload,
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
    data: null,
    error: null
  }
)

export const getUserData = state => state.users.data
export const getUserIsFetching = state => state.users.isFetching
