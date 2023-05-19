import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'

import LoginForm from './LoginForm'

const Header = ({ user }) => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch(handleUser(user))
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setNotification('wrong username or password', 5))
        }
    }
    return (
        <div>
            {user ? (
                <div>
                    <h2>blogs</h2>
                    <p>
                        {user.name} logged in
                        <br />
                        <br />
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
            ) : (
                <LoginForm
                    handleSubmit={handleLogin}
                    username={username}
                    handleUsernameChange={({ target }) =>
                        setUsername(target.value)
                    }
                    password={password}
                    handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                    }
                />
            )}
        </div>
    )
}

export default Header
