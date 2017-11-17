import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import './App.css'
import { addListener, removeListener, isAuthorized } from './AuthorizeApi'

import AuthRoute from './AuthRoute'
import Auth from './Auth'
import Private from './Private'
import Public from './Public'
import Home from './Home'

class App extends Component {
  state = {
    isAuthorized
  }

  componentDidMount () {
    addListener(this.handleAuthorize)
  }

  componentWillUnmount () {
    removeListener(this.handleAuthorize)
  }

  handleAuthorize = isAuthorized => {
    this.setState({ isAuthorized })
  }

  render () {
    return (
      <div>
        <nav>
          <ul>
            <li><Link to="/auth">Войти</Link></li>
            <li><Link to="/private">Секретная страница</Link></li>
            <li><Link to="/public">Публичная страница</Link></li>
            <li><Link to="/">Главная</Link></li>
          </ul>
        </nav>
        {/*<AuthRoute isAuthorized={isAuthorized} path="/private" component={Private} />*/}
        <Route path="/auth" component={Auth} />
        <Route path="/public" component={Public} />
        <Route exact path="/" component={Home} />
      </div>
    )
  }
}

export default App
