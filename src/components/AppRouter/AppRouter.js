import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { PrivateRoute } from '../PrivateRoute'
import { AuthPage } from '../AuthPage'
import { UserPage } from '../UserPage'

export class AppRouter extends Component {
  render () {
    return (
      <div className="App">
        <Switch>
          <PrivateRoute
            path="/user/:name"
            component={UserPage} />
          <Route path="/login" component={AuthPage} />
          <Redirect to="/user/lawejr" />
        </Switch>
      </div>
    )
  }
}
