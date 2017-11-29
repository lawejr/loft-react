import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { setToken } from '../../actions/auth'
import { withRouter } from 'react-router-dom'

class AuthPageClass extends PureComponent {
  static displayName = 'AuthPage'

  changeToken = (e) => {
    const { value } = this.tokenInput
    const { setToken, history } = this.props

    if (e.keyCode === 13 && value) {
      setToken(value)

      history.push('/')
    }
  }

  render () {
    return (
      <div>
        <p>Получить токен нужно на своей странице github, перейдите по адресу и
          создать себе токен. Запишите куда нибудь токен, так как после создания
          доступ к нему будет только один раз.</p>
        <input type="text"
               placeholder="auth_token"
               onKeyDown={this.changeToken}
               ref={(el) => { this.tokenInput = el }}
        />
        <p>После ввода нажать Enter</p>
      </div>
    )
  }
}

const mapDispatchToProps = { setToken }

export const AuthPage = withRouter(connect(null, mapDispatchToProps)(AuthPageClass))
