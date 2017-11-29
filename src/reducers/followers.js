import { handleActions } from 'redux-actions'
import {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure
} from '../actions/users'

export default handleActions({
    [fetchFollowersRequest]: (state, { payload }) => ({
      ...state,
      isFetching: true,
      login: payload,
      data: null,
      error: null
    }),
    [fetchFollowersSuccess]: (state, { payload }) => ({
      ...state,
      isFetching: false,
      isFetched: true,
      data: payload,
      error: null
    }),
    [fetchFollowersFailure]: (state, { error }) => ({
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

export const getFollowersData = (state) => state.followers.data
export const getFollowersIsFetching = (state) => state.followers.isFetching