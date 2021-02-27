import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = (props) => {
  const [view, setView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleDelete = () => {
    const result = window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author} ? `)
    if (result) {
      props.deleteBlog(props.blog)
    }
  }
  return (
    <div style = {blogStyle}>
      {props.blog.title} by {props.blog.author} {' '}
      <button onClick = {() => setView(!view)} className = 'view'>{view ? 'hide' : 'view'}</button>
      {view ?
        <div>
          <div>{props.blog.url} </div>
          <div ><span className = 'numLikes'>{props.blog.likes}</span>{' '} <button id = 'clickLike' onClick = {() => props.addLike(props.blog)}>like</button> </div>
          {props.blog.user.name}
          {props.username === props.blog.user.username ?
            <div>
              <button onClick = {handleDelete}>Remove</button>
            </div>
            : null
          }
        </div>
        : null
      }
    </div>
  )
}
Blog.propTypes = {
  deleteBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  addLike: PropTypes.func.isRequired
}
export default Blog
