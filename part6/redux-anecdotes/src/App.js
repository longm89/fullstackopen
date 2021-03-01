import React from 'react'
import Anecs from './components/Anecs'
import NewAnec from './components/AnecdoteForm'
const App = () => {
  
  return (  
      <div>
        <h2>Anecdotes</h2>
        <NewAnec/>
        <Anecs/>
      </div>  
      
  )
}

export default App