import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import Main from './components/Main'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import usersService from './services/users'
import { handleUser } from './reducers/userReducer'
import blogService from './services/blogs'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [users, setUsers] = useState(null)
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await usersService.getAll()
            setUsers(users)
        }
        fetchUsers()
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
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<User users={users} />} />
                </Routes>
            ) : null}
        </Router>
    )
}

export default App
