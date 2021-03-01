import React from 'react'
import {useDispatch} from 'react-redux'
import {createNewAnec} from '../reducers/anecdoteReducer'

const NewAnec = (props) => {
  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    const anec = event.target.anec.value 
    event.target.anec.value = ''
    dispatch(createNewAnec(anec))
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