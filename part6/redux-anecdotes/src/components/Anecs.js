import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {upVoteOf} from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state.sort((anec1, anec2) => anec2.votes - anec1.votes))
  const dispatch = useDispatch()
  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anec
        key = {anecdote.id}
        anecdote = {anecdote}
        handleClick = {() => dispatch(upVoteOf(anecdote.id))}
        />
      )}
    </div>
  )
}

export default Anecs