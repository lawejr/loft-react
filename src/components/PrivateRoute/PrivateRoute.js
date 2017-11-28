import React, { PureComponent } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getToken } from '../../reducers/auth'

class PrivateRouteClass extends PureComponent {
  render () {
    const { isAuthenticated, component: Component, ...rest } = this.props

    return (
      <Route
        {...rest}
        render={props => (
          isAuthenticated
            ? <Component {...props} />
            : <Redirect to="/login" />
        )}
      />
    )
  }
}

export const PrivateRoute = connect(state => ({
  isAuthenticated: getToken(state)
}))(PrivateRouteClass)