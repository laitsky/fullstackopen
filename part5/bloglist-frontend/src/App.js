import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [warning, setWarning] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({username, password})
      setUser(user.data)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (ex) {
      setWarning(ex.response.data.error)
      setTimeout(() => setWarning(null), 5000)
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const blogDisplay = () => (
    <div>
      <h2>blogs</h2>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
    </div>
  )
  return (
    <div>
      {user === null ?
      <LoginForm 
        username={username} password={password} warning={warning}
        setUsername={setUsername}
        setPassword={setPassword}
        handleSubmit={handleLogin}
      /> 
      : 
      <div>
        {`${user.name} is logged in`} <button onClick={handleLogout}>logout</button> <br />
        {blogDisplay()}
      </div>
      }
    </div>
  )
}

export default App