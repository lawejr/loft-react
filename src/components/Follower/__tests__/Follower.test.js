import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'
import { Follower } from '../index'

describe('Методы класс', () => {
  const wrapper = shallow(<Follower />)

  describe('Render', () => {
    const follower = {
      login: 'login',
      avatar_url: 'http://via.placeholder.com/300x300'
    }

    it('присутствует avatar', () => {
      wrapper.setProps({
        follower
      })

      const avatarNode = wrapper.find('img.avatar')

      expect(avatarNode).toHaveLength(1)
      expect(avatarNode.prop('src')).toEqual(follower.avatar_url)
    })

    it('присутствует ссылка с логином пользователя', () => {
      wrapper.setProps({
        follower: {
          login: follower.login
        }
      })

      const LinkComponent = wrapper.find(Link)

      expect(LinkComponent).toHaveLength(1)
      expect(LinkComponent.children().text()).toEqual(follower.login)
    })

    it('присутствует ссылка c адресом на /user/:login', () => {
      wrapper.setProps({
        follower: {
          login: follower.login
        }
      })

      const LinkComponent = wrapper.find(Link)

      expect(LinkComponent).toHaveLength(1)
      expect(LinkComponent.prop('to')).toEqual(`/user/${follower.login}`)
    })
  })
})
