import React from 'react'
import {useDispatch} from 'react-redux'
import {createNewAnec} from '../reducers/anecdoteReducer'
import {newMessage, removeMessage} from '../reducers/messageReducer'
const NewAnec = (props) => {
  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    const anec = event.target.anec.value 
    event.target.anec.value = ''
    dispatch(createNewAnec(anec))
    dispatch(newMessage(`you created '${anec}'`))
    setTimeout(() => {dispatch(removeMessage())}, 5000)
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

export default NewAnec