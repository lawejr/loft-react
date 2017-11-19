import React, { PureComponent } from 'react'
import './Order.css'

export default class Order extends PureComponent {
  render () {
    const { order } = this.props

    return (
      <article className="order" key={order.id}>
        <h3>Название: {order.name}</h3>
        <div>Цена: {order.price}</div>
        <div>Создан: {order.createdAt.toDateString()}</div>
      </article>
    )
  }
}