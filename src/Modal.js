import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './ModalButton.css'

class Modal extends Component {
  render () {
    return ReactDOM.createPortal(
      <div className="modal">
        <div className="modal__fog">
          <div className="modal__body">
            <h1>MODAL!</h1>
            <button onClick={this.props.closeModal}>Close</button>
          </div>
        </div>
      </div>,
      document.getElementById('portal')
    );
  }
}

export default Modal;
