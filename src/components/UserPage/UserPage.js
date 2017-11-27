import React, { PureComponent } from 'react'
import { Spinner } from '../Spinner'

export class UserPage extends PureComponent {
  componentDidMount () {

  }

  componentWillReceiveProps (nextProps) {

  }

  renderContent () {
    if (this.props.isFetching === false && this.props.user == null) {
      return <p className="error">Пользователя не существует</p>
    } else {
      return (
        <div className="content">
          UserPage
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
