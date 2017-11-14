import React, { Component } from 'react'
import './Switcher.css'

// Для работы этой компоненты нужно использовать методы React.Children.toArray
// а так же работать с child.type.name и child.type.displayName

class Switcher extends Component {
  state = {
    selectedChild: 0
  }

  handleChangeChild = (e) => {
    this.setState({
      selectedChild: parseInt(e.target.getAttribute('data-id'), 10)
    })
  }

  render () {
    const { selectedChild } = this.state
    const { children } = this.props

    return (
      <div>
        <nav>
          {React.Children.map(children, (child, ndx) => (
            <button
              className="component-list__name"
              onClick={this.handleChangeChild}
              key={child.type.name}
              data-id={ndx}>
              {child.type.displayName ? child.type.displayName : child.type.name}
            </button>)
          )}
        </nav>
        <section>
          {React.Children.toArray(children)[selectedChild]}
        </section>
      </div>
    )
  }
}

export default Switcher
