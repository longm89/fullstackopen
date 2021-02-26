import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginMessage, setLoginMessage] = useState(null)
  const [blogMessage, setBlogMessage] = useState(null)
  const blogFormRef = useRef()

  const createNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const savedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(savedBlog).sort((blog1,blog2) => blog1.likes-blog2.likes))
    setBlogMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setTimeout(() => setBlogMessage(null), 5000)
  }

  const blogForm = () => (
    <Togglable buttonLabel = 'new note' ref = {blogFormRef}>
      <h1>create new</h1>
      <BlogForm
        createNewBlog = {createNewBlog}
      />
    </Togglable>
  )




  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort((blog1,blog2) => blog1.likes-blog2.likes)))
  }, [])

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setLoginMessage('Wrong username or password')
      setTimeout(() => setLoginMessage(null), 5000)
    }
  }
  const loginForm = () => (
    <div>
      <h1>login to application</h1>
      <p>{loginMessage}</p>
      <LoginForm
        username = {username}
        password = {password}
        setUsername = {(event) => setUsername(event.target.value)}
        setPassword = {({ target }) => setPassword(target.value)}
        handleLogin = {handleLogin}
      />
    </div>

  )
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addLike = async (blogToUpdate) => {
    let newBlog = { ...blogToUpdate }
    newBlog.likes += 1
    const updatedBlog = await blogService.update(newBlog)
    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog).sort((blog1,blog2) => blog1.likes - blog2.likes))
  }

  const deleteBlog = async (blogToDelete) => {
    await blogService.deleteBlog(blogToDelete.id)
    setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id).sort((blog1,blog2) => blog1.likes - blog2.likes))
  }
  return (
    <div>
      {user === null
        ? loginForm()
        :
        <div>
          <h2>blogs</h2>
          <p>{blogMessage}</p>
          <p>
            {user.name}
            {' '}
              logged in
            {' '}
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}

          {blogs.map((blog) => <Blog key={blog.id} username = {user.username} blog={blog} addLike = {addLike} deleteBlog = {deleteBlog}/>)}
        </div>
      }

    </div>
  )
}

export default App
