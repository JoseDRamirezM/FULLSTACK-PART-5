import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin, username, password,
  handleSetUsername, handleSetPassword,
}) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
                username
          <input
            type="text"
            value={username}
            id="username"
            onChange={handleSetUsername}
          />
        </div>
        <div>
                password
          <input
            type="password"
            value={password}
            id="password"
            onChange={handleSetPassword}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleSetUsername: PropTypes.func.isRequired,
  handleSetPassword: PropTypes.func.isRequired
}
export default LoginForm