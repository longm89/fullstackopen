import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {connect} from 'react-redux'
import {upVoteOf} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/messageReducer'
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
const Anecs = (props) => {
  

  const handleUpVote = (anecdote) => {
    props.upVoteOf(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }
  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <Anec
        key = {anecdote.id}
        anecdote = {anecdote}
        handleClick = {() => handleUpVote(anecdote)}
        />
      )}
    </div>
  )
}
const mapStateToProps = (state) => {
  let filteredAnecdotes
    if (state.filter === '') {
      filteredAnecdotes = state.anecdotes
    } else {
      let re = new RegExp(state.filter, 'i')
      filteredAnecdotes = state.anecdotes.filter(anec => re.test(anec.content))
    }
    
    return {
      anecdotes: filteredAnecdotes.sort((anec1, anec2) => anec2.votes - anec1.votes)
    } 
      
}
const mapDispatchToProps = {
  upVoteOf, setNotification
}
const ConnectedAnecs = connect(mapStateToProps, mapDispatchToProps)(Anecs)
export default ConnectedAnecs