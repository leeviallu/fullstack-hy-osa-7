import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import usersService from '../services/users'
import { useEffect, useState } from 'react'

const Users = () => {
    const [users, setUsers] = useState(null)
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await usersService.getAll()
            setUsers(users)
        }
        fetchUsers()
    }, [])
    console.log(users)
    return (
        <div>
            {users ? (
                <div>
                    <h1>Users</h1>
                    <ul>
                        <li>blogs created</li>
                        {users.map((user) => (
                            <div key={user.id}>
                                <div>
                                    <Link to={`/users/${user.id}`}>
                                        {user.username}
                                    </Link>
                                    <ul>
                                        <li>{user.blogs.length}</li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>lol</div>
            )}
        </div>
    )
}
export default Users
