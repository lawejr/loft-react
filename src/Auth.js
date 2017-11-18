import React, { Component } from 'react'
import { authorizeUser } from './AuthorizeApi'
import { Redirect } from 'react-router-dom'

class Auth extends Component {
  constructor (props) {
    super(props)

    this.state.isAuthorized = this.props.isAuthorized
  }

  state = {
    email: '',
    password: '',
    error: false
  }

  onInputChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    const { email, password } = this.state
    this.setState({ error: !authorizeUser(email, password) })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ isAuthorized: nextProps.isAuthorized })
  }

  render () {
    const { isAuthorized, error } = this.state

    {
      return isAuthorized
        ? <Redirect from="/auth" to="/" />
        : <form>
            <input type="email" name="email" onChange={this.onInputChange} />
            <input type="password" name="password" onChange={this.onInputChange} />
            <button type="button" onClick={this.handleSubmit}>Submit</button>
            {error && <p className="error">Email or password is wrong</p>}
          </form>
    }
  }
}

export default Auth
