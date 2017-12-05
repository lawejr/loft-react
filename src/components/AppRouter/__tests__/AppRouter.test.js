import React from 'react'
import { shallow } from 'enzyme'
import { Route } from 'react-router-dom'
import { AppRouter } from '../index'
import { PrivateRoute } from '../../PrivateRoute'

describe('Render', () => {
  const wrapper = shallow(<AppRouter />)

  it('Присутствует компонента Switch', () => {
    expect(wrapper.find('Switch')).toHaveLength(1)
  })

  it('Присутствует компонента PrivateRoute с адресом "/user/me"', () => {
    expect(
      wrapper.findWhere(el => el.type() === PrivateRoute
        && el.props().path === '/user/me')
    ).toHaveLength(1)
  })

  it('Присутствует компонента PrivateRoute с адресом "/user/:name"', () => {
    expect(
      wrapper.findWhere(el => el.type() === PrivateRoute
        && el.props().path === '/user/:name')
    ).toHaveLength(1)
  })

  it('Присутствует компонента Route с адресом "/login"', () => {
    expect(
      wrapper.findWhere(el => el.type() === Route
        && el.props().path === '/login')
    ).toHaveLength(1)
  })

  it('Присутствует Выход, если props.isAuthorized === true', () => {
    wrapper.setProps({ isAuthorized: true })

    expect(wrapper.findWhere(el => el.type() === 'button' && el.text() === 'Выход')).toHaveLength(1)
  })

  it('Выводить сетевую ошибку networkError, если она передается через props.networkError', () => {
    const networkError = 'Тестовая ошибка'
    wrapper.setProps({ networkError })

    expect(wrapper.findWhere(el => el.type() === 'p' && el.text() === `Ошибка: ${networkError}`)).toHaveLength(1)
  })
})