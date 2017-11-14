import React, { Component } from 'react';

class CardNumberInput extends Component {
  state = {
    number: ''
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ number: this.format(nextProps.cardNumber) })
  }

  componentWillMount () {
    this.setState({ number: this.format(this.props.cardNumber) })
  }

  format (value) {
    if (!value) return ''

    return String(value).toString().replace(/(\w{4})/g, '$1 ').trim()
  }

  normalize (value) {
    if (!value) return ''

    return String(value).toString().replace(/\s/g, '')
  }

  handleChange = (e) => {
    const normalizedValue = this.normalize(e.target.value)

    this.props.onChange(normalizedValue)
    this.setState({ number: normalizedValue })
  }

  render () {
    return <input type="text"
                  value={this.state.number}
                  onChange={this.handleChange} />;
  }
}

export default CardNumberInput;
