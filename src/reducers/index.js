import { combineReducers } from 'redux'
import market from './market'
import farm from './farm'

export default combineReducers({
  market,
  farm
})