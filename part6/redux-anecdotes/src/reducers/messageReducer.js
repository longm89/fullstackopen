const messageReducer = (state = '', action) => {
  switch(action.type) {
    case 'NEW_MESSAGE':
      return action.message
    case 'REMOVE_MESSAGE':
      return ''
    default:
      return state
  }
}

export const newMessage = (content) => {
  return {
    type: 'NEW_MESSAGE',
    message: content
  }
}

export const removeMessage = () => {
  return {
    type: 'REMOVE_MESSAGE'
  }
}
export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(newMessage(content))
    setTimeout(() => {dispatch(removeMessage())}, time * 1000)
  }
}
export default messageReducer 