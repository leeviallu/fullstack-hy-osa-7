import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        updateInterface(state, action) {
            const updatedState = state.map(blog => {
              if (blog.id === action.payload.id) {
                return action.payload
              }
              return blog
            })
            return updatedState
        },
        deleteBlog(state, action) {
            const updatedState = state.filter(blog => blog.id !== action.payload)
            return updatedState
        }
    }
})

export const { setBlogs, appendBlog, updateInterface, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    }
}

export const createBlog = content => {
    return async dispatch => {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
    }
}

export const modifyBlog = (id, blogObject) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(id, blogObject)
        dispatch(updateInterface(updatedBlog))
    }
}

export const removeBlog = id => {
    return async dispatch => {
        const removedBlog = await blogService.remove(id)
        dispatch(deleteBlog(removedBlog))
    }
}

export default blogSlice.reducer