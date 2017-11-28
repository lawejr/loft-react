import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Followers } from '../Followers'
import { Spinner } from '../Spinner'
import { fetchUserRequest } from '../../actions/users'

class UserPageClass extends PureComponent {
  componentDidMount () {
    this.props.fetchUserRequest(this.props.match.params.name)
  }

  componentWillReceiveProps (nextProps) {
    this.props.fetchUserRequest(nextProps.match.params.name)
  }

  renderContent () {
    const { user } = this.props

    if (user == null) {
      return <p className="error">Пользователя не существует</p>
    } else {
      return (
        <div className="content">
          <img className="avatar" src={user.avatar} alt={user.login} />
          <p className="login">{user.login}</p>
          <p className="followers-count">
            Followers: <span className="counter">{user.followers ? user.followers.length : 0}</span>
          </p>
          <p className="repos-count">Public
            repos: <span className="counter">{user.repos ? user.repos.length : 0}</span>
          </p>
          <Followers login={user.login} />
        </div>
      )
    }
  }

  render () {
    return (
      <div className="UserPage">
        {
          this.props.isFetching
            ? <Spinner />
            : this.renderContent()
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.users.data
})

const mapDispatchToProps = {
  fetchUserRequest
}

export const UserPage = connect(mapStateToProps, mapDispatchToProps)(UserPageClass)