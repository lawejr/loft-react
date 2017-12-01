import { createActions } from 'redux-actions'

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure
} = createActions({
    FETCH_USER_REQUEST: null,
    FETCH_USER_SUCCESS: ({ data }) => data,
    FETCH_USER_FAILURE: null,
    FETCH_FOLLOWERS_REQUEST: null,
    FETCH_FOLLOWERS_SUCCESS: ({ data }) => data,
    FETCH_FOLLOWERS_FAILURE: null
  }
)
