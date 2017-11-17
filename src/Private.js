import React, { PureComponent } from 'react'

export default class Private extends PureComponent {
  static isPrivate = true

  render () {
    return <p>Private page</p>
  }
}
