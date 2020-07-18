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
      setUsername('')
      setPassword('')
    } catch (ex) {
      setWarning(ex.response.data.error)
      setTimeout(() => setWarning(null), 5000)
      setUsername('')
      setPassword('')
    }
  }

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
        {`${user.name} is logged in`} <br />
        {blogDisplay()}
      </div>
      }
    </div>
  )
}

export default App