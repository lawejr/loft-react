import React, { Component } from 'react'
import Modal from './Modal'

class ModalButton extends Component {
  static displayName = 'Modal Button'

  state = {
    isModalShow: false
  }

  hideModal = () => {
    this.setState({ isModalShow: false })
  }

  showModal = () => {
    this.setState({ isModalShow: true })
  }

  render () {
    return (
      <div>
        <button onClick={this.showModal}>Show modal!</button>
        {this.state.isModalShow && <Modal closeModal={this.hideModal} />}
      </div>
    )
  }
}

export default ModalButton
