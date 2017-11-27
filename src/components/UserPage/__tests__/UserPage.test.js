import React from 'react'
import { shallow } from 'enzyme'
import { UserPage } from '../index'

describe('Методы класс', () => {
  const wrapper = shallow(<UserPage />)

  it('Присутствует componentDidMount', () => {
    expect(wrapper.instance().componentDidMount).toBeDefined()
  })

  it('Присутствует componentWillReceiveProps', () => {
    expect(wrapper.instance().componentWillReceiveProps).toBeDefined()
  })

  describe('Render', () => {
    it('Если props.isFetching === true - присутствует спиннер', () => {
      wrapper.setProps({ isFetching: true })

      expect(wrapper.find('Spinner')).toHaveLength(1)
    })

    it('Если isFetching === false && user == null - выводит сообщение об ошибке', () => {
      wrapper.setProps({ isFetching: false })

      expect(wrapper.find('div.error')).toHaveLength(1)
    })
  })
})
