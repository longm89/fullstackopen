

export const createNewAnec = (data) => {
  return {
    type: 'newAnec',
    data
  }
}

const anecReducer = (state = [], action) => {
  
  switch(action.type) {
    case 'vote':
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)
      const VotedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : VotedAnecdote)
    case 'newAnec':
      return state.concat(action.data)  
    case 'INIT_ANECS':
      return action.data
    default: 
      return state 
  } 
  
}

export const upVoteOf = (id) => {
  return {
    type: 'vote',
    data: {id}
  }
}

export const initializeAnecs = (anecs) => {
  return {
    type: 'INIT_ANECS',
    data: anecs
  }
}
export default anecReducer