import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { authorize } from '../../actions/auth'

class AuthPageClass extends PureComponent {
  static displayName = 'AuthPage'

  changeToken = e => {
    const { value } = this.tokenInput
    const { authorize, history } = this.props

    if (e.keyCode === 13 && value) {
      authorize(value)

      history.push('/user/me')
    }
  }

  render () {
    return (
      <section>
        <div>
          <p>
            Получить токен нужно на своей странице github, перейдите по адресу
            и создать себе токен. Запишите куда нибудь токен, так как после
            создания доступ к нему будет только один раз.
          </p>
          <input
            type="text"
            placeholder="auth_token"
            onKeyDown={this.changeToken}
            ref={el => {
              this.tokenInput = el
            }}
          />
          <p>После ввода нажать Enter</p>
        </div>
      </section>
    )
  }
}

const mapDispatchToProps = {
  authorize
}

export const AuthPage = connect(null, mapDispatchToProps)(AuthPageClass)
