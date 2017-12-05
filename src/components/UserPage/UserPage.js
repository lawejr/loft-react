import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Followers } from '../Followers'
import { Spinner } from '../Spinner'
import { fetchUserRequest, fetchTokenOwnerRequest } from '../../actions/users'
import { getUserData, getUserIsFetching } from '../../reducers/users'

import './UserPage.css'

export class UserPageClass extends PureComponent {
  static displayName = 'UserPage'

  componentDidMount () {
    const { match, fetchUserRequest, fetchTokenOwnerRequest } = this.props
    const userName = match.params.name

    if (!userName) {
      fetchTokenOwnerRequest()
    } else {
      fetchUserRequest(userName)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.match.params.name !== nextProps.match.params.name) {
      this.props.fetchUserRequest(nextProps.match.params.name)
    }
  }

  renderContent () {
    const { user } = this.props

    if (user == null) {
      return <p className="error">Пользователя не существует</p>
    } else {
      return (
        <div className="UserPage">
          <div className="user-info">
            <img className="avatar" src={user.avatar_url} alt={user.login} />
            <div className="stats">
              <p className="login"><b>{user.login}</b></p>
              <p className="followers-count">Followers: <span
                className="counter">{user.followers}</span></p>
              <p className="repos-count">Public repos: <span
                className="counter">{user.public_repos}</span></p>
            </div>
          </div>
          <Followers login={user.login} />
        </div>
      )
    }
  }

  render () {
    return this.props.isFetching
      ? <Spinner />
      : this.renderContent()
  }
}

const mapStateToProps = (state) => ({
  user: getUserData(state),
  isFetching: getUserIsFetching(state)
})

const mapDispatchToProps = {
  fetchUserRequest,
  fetchTokenOwnerRequest
}

export const UserPage = connect(mapStateToProps, mapDispatchToProps)(UserPageClass)
