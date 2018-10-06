import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import ads from './ads'
import bundles from './bundles'
import campaigns from './campaigns'
import demographics from './demographics'

const reducer = combineReducers({ user, bundles, campaigns, ads, demographics })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './bundles'
export * from './campaigns'
export * from './ads'
export * from './demographics'
