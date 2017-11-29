import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

export class Follower extends PureComponent {
  static defaultProps = {
    follower: {}
  }

  render () {
    const { follower } = this.props

    return (
      <article>
        <img className="avatar" src={follower.avatar_url} alt={follower.login} />
        <Link to={`/user/${follower.login}`}>{follower.login}</Link>
      </article>
    )
  }
}
