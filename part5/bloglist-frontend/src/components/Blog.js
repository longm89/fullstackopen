import React, { useState } from 'react'
const Blog = ({ blog, name }) => {
  const [view, setView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style = {blogStyle}>
      {blog.title} by {blog.author} {' '}
      <button onClick = {() => setView(!view)}>{view ? 'hide' : 'view'}</button>
      {view ?
        <div>
          <div>{blog.url} </div>
          <div>{blog.likes} {' '} <button>like</button> </div>
          {name}
        </div>
        : null
      }
    </div>
  )
}

export default Blog
