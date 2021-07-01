import React, { useState, useEffect, useRef } from 'react'
import BlogsRender from './components/BlogsRender'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationState, setNotificationState] = useState(true)
  const [message, setMessage] = useState(null)

  const loginFormRef = useRef()
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( sortBlogs(blogs) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortBlogs = (blogs) => {
    return blogs.sort((blog, next) => {
      return next.likes - blog.likes
    })
  }

  const define_message = (text, style) => {
    setNotificationState(style)
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      await blogService.setToken(user.token)
      loginFormRef.current.toggleVisibility()
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      define_message('invalid username or password', false)
      console.log(exception)
    }
  }

  const handleLogOut = async () => {
    window.localStorage.clear()
    await setUser(null)
  }

  const handleCreateBlog = async (blogObject) => {
    if (blogObject.title && blogObject.author && blogObject.url) {
      if (!(blogs.filter(blog => blogObject.title === blog.title).length > 0)) {
        try {
          const returnedBlog = await blogService.create(blogObject)
          define_message('working on it...', true)
          await setBlogs(blogs => [...blogs, returnedBlog])
          await blogFormRef.current.toggleVisibility()
          define_message(`a new blog '${blogObject.title}' by ${blogObject.author} added`, true)
        } catch (exception) {
          define_message(exception.message, false)
        }
      } else {
        define_message(`duplicate found for ${blogObject.title}`)
      }
    } else {
      define_message('error: Pls check the fields!', false)
    }
  }

  const handleRemoveBlog = async (blog) => {
    if (window.confirm('remove blog?')) {
      try {
        await blogService.remove(blog.id)
        await setBlogs(blogs.filter(appBlog => appBlog.id !== blog.id))
        define_message('Blog removed!', true)
      } catch (exception) {
        define_message(exception.message, false)
      }
    } else {
      define_message('Only blog\'s creator can remove it', false )
    }
  }

  const handleLikeBlog = async (blog) => {
    if (blog) {
      try {
        const blogObject = {
          user: blog.user,
          likes: blog.likes + 1,
          author: blog.author,
          title: blog.title,
          url: blog.url
        }
        const returnedBlog = await blogService.like(blog.id, blogObject)
        const newBlogs = [...blogs]
        newBlogs[blogs.indexOf(blog)] = returnedBlog
        await setBlogs(sortBlogs(newBlogs))
      } catch (exception) {
        define_message(exception, false)
      }
    } else {
      define_message('something went wrong!', false)
    }
  }

  const handleSetUsername = ({ target }) => setUsername(target.value)

  const handleSetPassword = ({ target }) => setPassword(target.value)

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login' ref={loginFormRef}>
        <LoginForm
          username={username}
          password={password}
          handleSetUsername={handleSetUsername}
          handleSetPassword={handleSetPassword}
          handleLogin={handleLogin}
        />
      </Togglable>
    )
  }

  const blogsRender = () => {
    return (
      <BlogsRender
        blogs={blogs}
        handleLikeBlog={handleLikeBlog}
        handleRemoveBlog={handleRemoveBlog}
        user={user}
      />
    )
  }

  const addBlogForm = () => {
    return (
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <AddBlogForm
          createBlog={handleCreateBlog} />
      </Togglable>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {user !== null && <p>{user.name} logged <button onClick={handleLogOut}>logout</button></p>}
      <Notification message={message} style={notificationState} />
      {user === null && loginForm()}
      {user !== null && addBlogForm()}
      {blogsRender()}
    </div>
  )
}

export default App