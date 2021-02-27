import React from 'react'
import PropTypes from 'prop-types'
const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input id = 'username'
            type="text"
            value={username}
            name="Username"
            onChange={setUsername}
          />
        </div>
        <div>
        password
          <input id = 'password'
            type="password"
            value={password}
            name="Password"
            onChange={setPassword}
          />
        </div>
        <button type="submit" id = 'login'>login</button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}
export default LoginForm