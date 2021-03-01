import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
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
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store