import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Followers } from '../Followers'
import { Spinner } from '../Spinner'
import { fetchUserRequest } from '../../actions/users'
import { getUserData, getIsFetching } from '../../reducers/users'

export class UserPageClass extends PureComponent {
  componentDidMount () {
    this.props.fetchUserRequest(this.props.match.params.name)
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
        <div className="content">
          <img className="avatar" src={user.avatar_url} alt={user.login} />
          <p className="login">{user.login}</p>
          <p className="followers-count">Followers:
            <span className="counter">{user.followers}</span>
          </p>
          <p className="repos-count">Public repos:
            <span className="counter">{user.public_repos}</span>
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

const mapStateToProps = (state) => ({
  user: getUserData(state),
  isFetching: getIsFetching(state)
})

const mapDispatchToProps = {
  fetchUserRequest
}

export const UserPage = connect(mapStateToProps, mapDispatchToProps)(UserPageClass)