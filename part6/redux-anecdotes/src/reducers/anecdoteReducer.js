import anecService from '../services/anecdotes'

export const createNewAnec = (content) => {
  return async dispatch => {
    const createdAnec = await anecService.createNew(content)
    dispatch({
      type: 'newAnec',
      data: createdAnec
    })
  }
  
}

const anecReducer = (state = [], action) => {
  
  switch(action.type) {
    case 'vote':
      const id = action.data.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.data)
    case 'newAnec':
      return state.concat(action.data)  
    case 'INIT_ANECS':
      return action.data
    default: 
      return state 
  } 
  
}

export const upVoteOf = (anecdote) => {
  return async dispatch => {
    const updatedAnec = await anecService.update({...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'vote',
      data: updatedAnec 
    })
  }

}

export const initializeAnecs = () => {
  return async dispatch => {
    const anecs = await anecService.getAll()
    dispatch(
      {
        type: 'INIT_ANECS',
        data: anecs
      }
    )
  }
}
export default anecReducer