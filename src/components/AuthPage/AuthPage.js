import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { authorize, logout } from '../../actions/auth'
import { getIsAuthorized } from '../../reducers/auth'

class AuthPageClass extends PureComponent {
  static displayName = 'AuthPage'

  changeToken = e => {
    const { value } = this.tokenInput
    const { authorize, history } = this.props

    if (e.keyCode === 13 && value) {
      authorize(value)

      history.push('/')
    }
  }

  onClickLogout = e => {
    this.props.logout()
  }

  render () {
    return (
      <section>
        {this.props.isAuthorized ? (
          <button type="button" onClick={this.onClickLogout}>
            Выход
          </button>
        ) : (
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
        )}
      </section>
    )
  }
}

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state)
})
const mapDispatchToProps = { authorize, logout }

export const AuthPage = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthPageClass)
)
