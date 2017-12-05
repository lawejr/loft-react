import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { PrivateRoute } from '../PrivateRoute'
import { AuthPage } from '../AuthPage'
import { UserPage } from '../UserPage'
import { logout } from '../../actions/auth'
import { getIsAuthorized } from '../../reducers/auth'
import { getNetworkError } from '../../reducers/network'

import './App.css'

export class AppRouter extends Component {
  onClickLogout = () => {
    this.props.logout()
  }

  render () {
    const { isAuthorized, networkError } = this.props

    return (
      <div className="App">
        {isAuthorized && (
          <button className="logout-button" type="button" onClick={this.onClickLogout}>
            Выход
          </button>)
        }
        {networkError && <p className="error-message">Ошибка: {networkError}</p>}
        <Switch>
          <PrivateRoute path="/user/me" component={UserPage} />
          <PrivateRoute
            path="/user/:name"
            component={UserPage} />
          <Route path="/login" component={AuthPage} />
          <Redirect to="/user/me" />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthorized: getIsAuthorized(state),
  networkError: getNetworkError(state)
})

const mapDispatchToProps = {
  logout
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRouter))
