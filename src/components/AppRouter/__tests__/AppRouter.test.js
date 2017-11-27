import React from 'react'
import { shallow } from 'enzyme'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AppRouter } from '../index'
import { PrivateRoute } from '../../PrivateRoute'

describe('Render', () => {
  const wrapper = shallow(<AppRouter />)

  it('Присутствует компонента Switch', () => {
    expect(wrapper.find('Switch')).toHaveLength(1)
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

  it('Присутствует редирект на "/user/lawejr"', () => {
    expect(
      wrapper.findWhere(el => el.type() === Redirect
        && el.props().to === '/user/lawejr')
    ).toHaveLength(1)
  })
})