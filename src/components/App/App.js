import React, { PureComponent } from 'react'
import './App.css'

import Market from '../Market'

export default class App extends PureComponent {
  render () {
    return (
      <main className="app">
        <Market />
      </main>
    )
  }
}
