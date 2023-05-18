import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import usersService from './services/users'

const App = () => {
    const user = useSelector((state) => state.user)
    const [users, setUsers] = useState(null)
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await usersService.getAll()
            setUsers(users)
        }
        fetchUsers()
    }, [])
    return (
        <Router>
            {user ? (
                <div>
                    <h2>blogs</h2>
                    <p>
                        {user.name} logged in
                        <button
                            onClick={() => {
                                window.localStorage.removeItem(
                                    'loggedBlogappUser'
                                )
                                window.location.reload()
                            }}
                        >
                            log out
                        </button>
                    </p>
                </div>
            ) : null}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User users={users} />} />
            </Routes>
        </Router>
    )
}

export default App
