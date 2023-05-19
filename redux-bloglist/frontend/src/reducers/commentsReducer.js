import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const commentsSlice = createSlice({
    name: 'comments',
    initialState: [],
    reducers: {
        makeComment: (state, action) => {
            state.push(action.payload)
        },
        setComments: (state, action) => {
            return action.payload
        },
    },
})

export const { makeComment, setComments } = commentsSlice.actions

export const initializeComments = () => {
    return async (dispatch) => {
        const comments = await blogsService.getComments()
        dispatch(setComments(comments))
    }
}

export const createComment = (id, comment) => {
    return async (dispatch) => {
        const createdComment = await blogsService.newComment(id, comment)
        dispatch(makeComment(createdComment))
    }
}

export default commentsSlice.reducer
