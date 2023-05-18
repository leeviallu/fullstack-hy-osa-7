import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        makeNotification: (state, action) => {
            return action.payload
        },
    },
})

export const { makeNotification } = notificationSlice.actions

export const setNotification = (notification, seconds) => {
    return (dispatch) => {
        dispatch(makeNotification(notification))
        setTimeout(() => {
            dispatch(makeNotification(''))
        }, seconds * 1000)
    }
}

export default notificationSlice.reducer
