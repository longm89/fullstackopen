import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {upVoteOf} from '../reducers/anecdoteReducer'
import {newMessage, removeMessage} from '../reducers/messageReducer'
const Anec = ({anecdote, handleClick}) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecs = () => {
  const anecdotes = useSelector(state => {
    let filteredAnecdotes
    if (state.filter === '') {
      filteredAnecdotes = state.anecdotes
    } else {
      let re = new RegExp(state.filter, 'i')
      filteredAnecdotes = state.anecdotes.filter(anec => re.test(anec.content))
    }
    console.log(filteredAnecdotes)
    return filteredAnecdotes.sort((anec1, anec2) => anec2.votes - anec1.votes)
  })
  const dispatch = useDispatch()
  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anec
        key = {anecdote.id}
        anecdote = {anecdote}
        handleClick = {() => 
          {dispatch(upVoteOf(anecdote.id))
           dispatch(newMessage(`you voted '${anecdote.content}'`))
           setTimeout(() => {dispatch(removeMessage())}, 5000)
          }}
        />
      )}
    </div>
  )
}

export default Anecs