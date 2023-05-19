import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Main from './components/Main'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { handleUser } from './reducers/userReducer'
import blogService from './services/blogs'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const users = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(handleUser(user))
            blogService.setToken(user.token)
        }
    }, [])

    return (
        <Router>
            <Main user={user} />
            {user ? (
                <Routes>
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blogs/:id" element={<Blog />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<User users={users} />} />
                </Routes>
            ) : null}
        </Router>
    )
}

export default App
