import React, { useState } from 'react'
import PropTypes from 'prop-types'
const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url, likes }
    createNewBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        url:
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        likes:
        <input
          type="number"
          value={likes}
          onChange={({ target }) => setLikes(target.value)}
        />
        <button type="submit">create</button>
      </form>
    </div>
  )
}
BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired
}
export default BlogForm