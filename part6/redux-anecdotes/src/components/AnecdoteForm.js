import React from 'react'
import {connect} from 'react-redux'
import {createNewAnec} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/messageReducer'

const NewAnec = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anec = event.target.anec.value 
    event.target.anec.value = ''
    props.createNewAnec(anec)
    props.setNotification(`you created '${anec}'`, 5)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit = {addAnecdote}>
        <div><input name = 'anec'/></div>
        <button type = 'submit'>create</button>
      </form>
    </div>
  )
}

export default connect(null, {createNewAnec, setNotification})(NewAnec)