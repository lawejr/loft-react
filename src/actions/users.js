import { createActions } from 'redux-actions'

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure
} = createActions({
  FETCH_USER_REQUEST: null,
  FETCH_USER_SUCCESS: ({ data }) => data,
  FETCH_USER_FAILUR: null
})

export const { fetchTokenOwnerRequest } = createActions(
  'FETCH_TOKEN_OWNER_REQUEST'
)

export const {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure
} = createActions({
  FETCH_FOLLOWERS_REQUEST: null,
  FETCH_FOLLOWERS_SUCCESS: ({ data }) => data,
  FETCH_FOLLOWERS_FAILUR: null
})
