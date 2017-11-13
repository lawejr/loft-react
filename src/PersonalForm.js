import React, { Component } from 'react';
import Title from './Title';
import './PersonalForm.css';

export class PersonalForm extends Component {
  handleChangeForm = (e) => {
    const { name, value } = e.target

    this.props.onChangeForm(name, value)
  }

  render () {
    return (
      <div>
        <Title>Персональная информация</Title>
        <div className="personal-form">
          <input type="text"
                 name="firstName"
                 placeholder="firstName"
                 onChange={this.handleChangeForm} />
          <input type="text"
                 name="lastName"
                 placeholder="lastName"
                 onChange={this.handleChangeForm} />
          <input type="text"
                 name="email"
                 placeholder="email"
                 onChange={this.handleChangeForm} />
        </div>
      </div>
    );
  }
}

export default PersonalForm;
