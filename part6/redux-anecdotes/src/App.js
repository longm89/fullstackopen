import React, {useEffect} from 'react'
import Anecs from './components/Anecs'
import NewAnec from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import {initializeAnecs} from './reducers/anecdoteReducer'
import anecService from './services/anecdotes'
import {useDispatch} from 'react-redux'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecs())
  }, [dispatch])
  return (  
      <div>
        <h2>Anecdotes</h2>
        <Notification/>
        <Filter />
        
        <Anecs/>
        <NewAnec/>
        
      </div>  
      
  )
}

export default App