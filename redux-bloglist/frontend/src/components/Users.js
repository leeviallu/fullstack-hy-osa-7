import { Link } from 'react-router-dom'
import usersService from '../services/users'
import { useEffect, useState } from 'react'
import './Users.css'

const Users = () => {
    const [users, setUsers] = useState(null)
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await usersService.getAll()
            setUsers(users)
        }
        fetchUsers()
    }, [])
    return (
        <div>
            {users ? (
                <div>
                    <h1>Users</h1>
                    <ul className="user-list">
                        <li className="list-item">user</li>
                        <li className="list-item">blogs created</li>
                        {users.map((user) => (
                            <div key={user.id}>
                                <div>
                                    <Link to={`/users/${user.id}`}>
                                        <li className="list-item">
                                            {user.username}
                                        </li>
                                    </Link>

                                    <li>{user.blogs.length}</li>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    )
}
export default Users
