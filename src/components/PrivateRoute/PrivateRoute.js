import React, { PureComponent } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getToken } from '../../reducers/auth'

class ProvateRouteClass extends PureComponent {
  render () {
    const { token, component: Component, ...rest } = this.props

    return (
      <Route
        {...rest}
        render={props => (
          token
            ? <Component {...props} />
            : <Redirect to="/login" />
        )}
      />
    )
  }
}

export const PrivateRoute = connect(state => ({
  token: getToken(state)
}))(ProvateRouteClass)