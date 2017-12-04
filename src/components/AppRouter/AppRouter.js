import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { PrivateRoute } from '../PrivateRoute'
import { AuthPage } from '../AuthPage'
import { UserPage } from '../UserPage'
import { logout } from '../../actions/auth'
import { getIsAuthorized } from '../../reducers/auth'
import { getNetworkError } from '../../reducers/network'

export class AppRouter extends Component {
  onClickLogout = () => {
    this.props.logout()
  }

  render () {
    const { isAuthorized, networkError } = this.props

    return (
      <div className="App">
        {isAuthorized && (
          <button type="button" onClick={this.onClickLogout}>
            Выход
          </button>)
        }
        {networkError && <p>Ошибка: {networkError}</p>}
        <Switch>
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

const mapDisputchToProps = {
  logout
}

export default withRouter(connect(mapStateToProps, mapDisputchToProps)(AppRouter))
