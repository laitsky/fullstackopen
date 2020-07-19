import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [warning, setWarning] = useState(null)
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user.data)
      blogService.setToken(user.data.token)
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
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleCreateBlog = async e => {
    e.preventDefault()
    const newBlog = { title, author, url }
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setWarning(`a new blog titled '${title}' by ${author} added`)
      setTimeout(() => setWarning(null), 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (ex) {
      setWarning(ex.response.data.error)
      setTimeout(() => setWarning(null), 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user.data)
      blogService.setToken(user.data.token)
    }
  }, [])

  const blogDisplay = () => (
    <div>
      <h1>blogs</h1>
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
          {
            <div style={{ color: 'green', fontWeight: 'bold', fontSize: '2em', textDecoration: 'underline' }}>
              {warning}
            </div>
          }
          {blogDisplay()}
          <CreateBlog
            title={title} author={author} url={url}
            setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl}
            handleSubmit={handleCreateBlog}
          />
        </div>
      }
    </div>
  )
}

export default App