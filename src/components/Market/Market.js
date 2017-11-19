import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createOrder, moveOrderToFarm } from '../../actions/marketActions'
import { getMarketOrders } from '../../reducers/selectors'

import './Market.css'

let id = 0
const getId = () => {
  id += 1
  return id
}
export const vegetables = [
  'Капуста',
  'Редиска',
  'Огурцы',
  'Морковь',
  'Горох',
  'Баклажан',
  'Тыква',
  'Чеснок',
  'Лук',
  'Перец',
  'Картофель',
  'Редька'
]

const getNewOrder = () => {
  return {
    id: getId(),
    name: vegetables[Math.floor(Math.random() * vegetables.length)],
    price: 100 + Math.floor(Math.random() * 100),
    createdAt: new Date()
  }
}

export class Market extends Component {
  createOrder = () => {
    this.props.createOrder(getNewOrder())
  }

  moveLastOrderToFarm = () => {
    const { orders } = this.props

    this.props.moveOrderToFarm(orders[orders.length - 1])
  }

  render () {
    const { orders } = this.props

    return (
      <div className="market">
        <h2>Новые заказы в магазине</h2>
        <button onClick={this.createOrder}>Создать заказ</button>
        <button onClick={this.moveLastOrderToFarm} disabled={!orders.length}>Отправить заказ на ферму
        </button>
        <ul className="orders-list">
          {
            orders.map((order) => (
              <li className="order-item" key={order.id}>
                <h3>Название: {order.name}</h3>
                <div>Цена: {order.price}</div>
                <div>Создан: {order.createdAt.toDateString()}</div>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: getMarketOrders(state)
})

const mapDispatchToProps = {
  createOrder,
  moveOrderToFarm
}

export default connect(mapStateToProps, mapDispatchToProps)(Market)
