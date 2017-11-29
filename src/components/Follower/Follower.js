import React, { PureComponent } from 'react'

export class Follower extends PureComponent {
  render () {
    const { follower } = this.props

    return (<article>{follower.login}</article>)
  }
}
