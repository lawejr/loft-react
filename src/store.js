import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers'
import searchMiddleware from './middlewares/searchMiddleware'
import showsMiddleware from './middlewares/showsMiddleware'

export default initialState =>
  createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(searchMiddleware, showsMiddleware),
      window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  )
