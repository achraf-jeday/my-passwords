import { combineReducers } from 'redux'
import userReducers from './userReducers'

export default combineReducers({
  user_state: userReducers
})
