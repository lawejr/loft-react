import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchFollowersRequest } from '../../actions/users'
import {
  getFollowersData,
  getFollowersIsFetching
} from '../../reducers/followers'
import { Spinner } from '../Spinner'
import { Follower } from '../Follower/index'

import './Followers.css'

export class FollowersClass extends PureComponent {
  static displayName = 'Followers'

  componentDidMount () {
    const { fetchFollowersRequest, login } = this.props

    fetchFollowersRequest(login)
  }

  renderContent () {
    const { followers } = this.props

    if (!followers || !followers.length) {
      return <p className="empty">У пользователя нет подписчиков</p>
    } else {
      return (
        <ul className="Followers">
          {followers.map((fwr) => (
            <li className="followers-item" key={fwr.id}>
              <Follower className="Follower" follower={fwr} />
            </li>
          ))}
        </ul>
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
  followers: getFollowersData(state),
  isFetching: getFollowersIsFetching(state)
})

const mapDispatchToProps = {
  fetchFollowersRequest
}

export const Followers = connect(mapStateToProps, mapDispatchToProps)(FollowersClass)