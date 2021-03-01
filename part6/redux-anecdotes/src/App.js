import React from 'react'
import Anecs from './components/Anecs'
import NewAnec from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
const App = () => {
  
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