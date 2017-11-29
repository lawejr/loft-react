import React from 'react'
import { shallow } from 'enzyme'
import { FollowersClass as Followers } from '../Followers'
import { Spinner } from '../../Spinner'
import { Follower } from '../../Follower/index'

describe('Методы класс', () => {
  const wrapper = shallow(<Followers fetchFollowersRequest={jest.fn()} />)

  it('Присутствует componentDidMount', () => {
    expect(wrapper.instance().componentDidMount).toBeDefined()
  })

  describe('Render', () => {
    it('Если props.isFetching === true - присутствует спиннер', () => {
      wrapper.setProps({ isFetching: true })

      expect(wrapper.find(Spinner)).toHaveLength(1)
    })

    it('Если подписчики есть, должны отображаться компоненты Follower для каждого подписчика', () => {
      const testFollowers = [{id: '1'}, {id: '2'}, {id: '3'}]

      wrapper.setProps({
        isFetching: false,
        followers: testFollowers
      })

      const FollowersList = wrapper.find(Follower)

      expect(FollowersList.length).toEqual(testFollowers.length)
    })
  })
})
