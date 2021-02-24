import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
const CreateNewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    const newBlog = {title, author, url, likes}
    const savedBlog = await blogService.create(newBlog)
    console.log('sent to the server', savedBlog)
    props.addnewblog(savedBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }
  return (
    <form onSubmit = {handleSubmit}>
      title: 
      <input
        type = "text"
        value = {title}
        name = "Title"
        onChange = {({target}) => setTitle(target.value)}
      />
      author:
      <input
        type = "text"
        value = {author}
        onChange = {({target}) => setAuthor(target.value)}
      />
      url:
      <input
        type = "text"
        value = {url}
        onChange = {({target}) => setUrl(target.value)}
      />
      likes:
      <input
        type = "number"
        value = {likes}
        onChange = {({target}) => setLikes(target.value)}
      />
      <button type = "submit">create</button>
    </form>
  )
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const loginForm = () => (
    <form onSubmit = {handleLogin}>
        <div>
          username 
          <input
          type = "text"
          value = {username}
          name = "Username"
          onChange = {({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password 
          <input
          type = "password"
          value = {password}
          name = "Password"
          onChange = {({target}) => setPassword(target.value)}
          />
        </div>
        <button type = "submit">login</button>
      </form>
  )
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
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const addnewblog = (newBlog) => {
    setBlogs(blogs.concat(newBlog))
  }
  return (
    <div>
      <h1>{errorMessage}</h1>
      {user === null ? 
        loginForm() : 
        <div>
          <p>{user.name} logged in <button onClick = {handleLogout}>logout</button></p>
          <CreateNewBlog addnewblog = {addnewblog}/>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
      
      
    </div>
  )
}

export default App