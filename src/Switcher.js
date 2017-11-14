import React, { Component } from 'react'
import './Switcher.css'

// Для работы этой компоненты нужно использовать методы React.Children.toArray
// а так же работать с child.type.name и child.type.displayName

class Switcher extends Component {
  state = {
    selectedChild: 0
  }

  componentDidMount () {
    if (window.location.hash) {
      const childIndex = React.Children.toArray(this.props.children).findIndex((child) => child.type.name === window.location.hash.slice(1))

      if (childIndex !== -1) this.setState({ selectedChild: childIndex })
    }
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
            <a
              href={`#${child.type.name}`}
              className="component-list__name"
              onClick={this.handleChangeChild}
              key={child.type.name}
              data-id={ndx}>
              {child.type.displayName ? child.type.displayName : child.type.name}
            </a>)
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
