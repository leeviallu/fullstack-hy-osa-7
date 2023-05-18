import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, modifyBlog, removeBlog } from './reducers/blogReducer'
import { handleUser } from './reducers/userReducer'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state).notification
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(handleUser(user))
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
      dispatch(handleUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 5))
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 5))
  }

  const addBlogLikes = async (id, blogObject) => {
    dispatch(modifyBlog(id, blogObject))
  }

  const deleteBlog = async (id) => {
    dispatch(removeBlog(id))
    window.location.reload()
  }

  const blogFormRef = useRef()
  return (
    <div>
      <Notification message={notification} />
      {
        user ?
          <div>
            <h2>blogs</h2>
            <p>{user.name} logged in
              <button onClick={() => {
                window.localStorage.removeItem('loggedBlogappUser')
                window.location.reload()
              }}>
            log out
              </button>
            </p>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm
                createBlog={addBlog}
              />
            </Togglable>
            {
              [...blogs].sort((blog1, blog2) => blog2.likes - blog1.likes).map((blog, i) => (
                <Blog
                  key={i}
                  blog={blog}
                  updateBlog={addBlogLikes}
                  deleteBlog={deleteBlog}
                  user={user}
                />
                )
              )
            }
          </div>
          :
          <LoginForm
            handleSubmit={handleLogin}
            username={username}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            password={password}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
      }
    </div>
  )
}

export default App