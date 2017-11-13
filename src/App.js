import React, { Component } from 'react';
import './App.css';
import Step from './Step';
import PersonalForm from './PersonalForm';
import CardForm from './CardForm';

const stepTitles = ['Personal information', 'Card information', 'Finish'];

class App extends Component {
  state = {
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    cardNumber: '',
    isTimeOver: false
  }

  handleTabClick = (stepNum) => {
    this.setState({ step: stepNum })
  }

  handleChangeForm = (name, value) => {
    this.setState({ [name]: value })
  }

  handleClickNextForm = () => {
    this.setState({ step: this.state.step + 1 })
  }

  handleChangeTimeOver = (over) => {
    this.setState({ isTimeOver: over })
  }

  isFormCommitable = () => {
    const { step, firstName, lastName, email, cardNumber } = this.state

    switch (step) {
      case 1:
        return firstName !== '' && lastName !== '' && email !== '' && email.includes('@')
      case 2:
        return cardNumber.length === 16
      default:
        return false
    }
  }

  renderForm () {
    const { step, cardNumber, firstName, lastName, email } = this.state

    switch (step) {
      case 1:
        return (
          <PersonalForm
            firstName={firstName}
            lastName={lastName}
            email={email}
            onChangeForm={this.handleChangeForm} />
        )
      case 2:
        return (
          <CardForm cardNumber={cardNumber}
                    onChangeForm={this.handleChangeForm}
                    onChangeTimeOver={this.handleChangeTimeOver} />
        )
      case 3:
        return 'Поздравляем!'
      default:
        return 'Ошибка'
    }
  }

  render () {
    const { isTimeOver, step } = this.state

    return (
      <div className="container">
        <div className="tab-panel">
          {stepTitles.map((title, ndx) => (
              <Step key={title}
                    onClick={this.handleTabClick}
                    isSelected={step === ndx + 1}
                    number={ndx + 1}
                    isClickable={step > ndx + 1}>
                {title}
              </Step>
            )
          )}
        </div>
        <div className="form-content">
          {this.renderForm()}
        </div>
        <div className="button-panel">
          <button className="button-next"
                  onClick={this.handleClickNextForm}
                  disabled={!this.isFormCommitable() || isTimeOver}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default App;
