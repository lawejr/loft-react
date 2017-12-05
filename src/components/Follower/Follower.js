import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import './Follower.css'

export class Follower extends PureComponent {
  static defaultProps = {
    follower: {}
  }

  render () {
    const { follower, ...props } = this.props

    return (
      <article {...props}>
        <img className="follower-avatar" src={follower.avatar_url} alt={follower.login} />
        <Link to={`/user/${follower.login}`}>{follower.login}</Link>
      </article>
    )
  }
}
