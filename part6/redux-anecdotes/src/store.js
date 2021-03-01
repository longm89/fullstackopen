import {createStore, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  message: messageReducer,
  filter: filterReducer 
})

const store = createStore(
  reducer, 
  composeWithDevTools()
)

export default store