import React from 'react'
import {useDispatch} from 'react-redux'
import {createNewAnec} from '../reducers/anecdoteReducer'
import {newMessage, removeMessage} from '../reducers/messageReducer'
import anecService from '../services/anecdotes'
const NewAnec = (props) => {
  const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const anec = event.target.anec.value 
    event.target.anec.value = ''
    const createdAnec = await anecService.createNew(anec)
    dispatch(createNewAnec(createdAnec))
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