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
let prevRemoval = null 
export const setNotification = (content, time) => {
  return async dispatch => {
    if (prevRemoval !== null) {
      clearTimeout(prevRemoval)
    }
    console.log('value before set new message', prevRemoval)
    dispatch(newMessage(content))
    prevRemoval = setTimeout(() => {
      prevRemoval = null
      dispatch(removeMessage())
      
    }, time * 1000)
  }
}
export default messageReducer 