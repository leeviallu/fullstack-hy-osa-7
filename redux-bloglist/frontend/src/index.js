import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import commentsReducer from './reducers/commentsReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        user: userReducer,
        users: usersReducer,
        comments: commentsReducer,
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
