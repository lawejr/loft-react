import React from 'react'
import { shallow } from 'enzyme'
import { UserPageClass as UserPage } from '../index'
import { Followers } from '../../Followers'
import { Spinner } from '../../Spinner'

describe('Методы класс', () => {
  const wrapper = shallow(<UserPage
    match={{params: {name: 'test-name'}}}
    fetchUserRequest={jest.fn()}
  />)

  it('Присутствует componentDidMount', () => {
    expect(wrapper.instance().componentDidMount).toBeDefined()
  })

  it('Присутствует componentWillReceiveProps', () => {
    expect(wrapper.instance().componentWillReceiveProps).toBeDefined()
  })

  describe('Render', () => {
    it('Если props.isFetching === true - присутствует спиннер', () => {
      wrapper.setProps({ isFetching: true })

      expect(wrapper.find(Spinner)).toHaveLength(1)
    })

    it('Если isFetching === false && user == null - выводит сообщение об ошибке', () => {
      wrapper.setProps({
        isFetching: false,
        user: undefined
      })

      expect(wrapper.find('p.error')).toHaveLength(1)
    })

    describe('Если user существует - должны отображаться', () => {
      const user = {
        login: 'login',
        avatar_url: 'http://via.placeholder.com/300x300',
        followers: '10',
        public_repos: '22'
      }

      it('avatar', () => {
        wrapper.setProps({
          user: {
            avatar_url: user.avatar_url
          }
        })

        const avatarNode = wrapper.find('img.avatar')

        expect(avatarNode).toHaveLength(1)
        expect(avatarNode.prop('src')).toEqual(user.avatar_url)
      })

      it('login', () => {
        wrapper.setProps({
          user: {
            login: user.login
          }
        })

        const loginNode = wrapper.find('p.login')

        expect(loginNode).toHaveLength(1)
        expect(loginNode.text()).toEqual(user.login)
      })

      it('количество фоловеров', () => {
        wrapper.setProps({
          user: {
            followers: user.followers
          }
        })

        const followersCounterNode = wrapper.find('p.followers-count .counter')

        expect(followersCounterNode).toHaveLength(1)
        expect(followersCounterNode.text()).toEqual(user.followers)
      })

      it('количество публичных репозиториев', () => {
        wrapper.setProps({
          user: {
            public_repos: user.public_repos
          }
        })

        const reposCounter = wrapper.find('p.repos-count .counter')

        expect(reposCounter).toHaveLength(1)
        expect(reposCounter.text()).toEqual(user.public_repos)
      })

      it('компонент Followers с передачей user.login через props', () => {
        wrapper.setProps({
          user: {
            login: user.login
          }
        })

        const FollowersComponent = wrapper.find(Followers)

        expect(FollowersComponent).toHaveLength(1)
        expect(FollowersComponent.prop('login')).toEqual(user.login)
      })
    })
  })
})
