import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import ads from './ads'
import bundles from './bundles'
import campaigns from './campaigns'
import contracts from './contracts'

const reducer = combineReducers({ user, bundles, campaigns, ads, contracts })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

const initialState = localStorage.state
  ? JSON.parse(localStorage.state)
  : undefined
const store = createStore(reducer, initialState, middleware)

store.subscribe(() => {
  localStorage.state = JSON.stringify(store.getState())
})

export default store
export * from './user'
export * from './bundles'
export * from './campaigns'
export * from './contracts'
