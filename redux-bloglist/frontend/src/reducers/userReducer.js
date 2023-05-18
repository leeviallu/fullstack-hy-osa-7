import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            console.log(action)
            return action.payload
        }
    },
})

export const { setUser } = userSlice.actions

export const handleUser = (user) => {
    return async dispatch => {
        dispatch(setUser(user))
    }
}

export default userSlice.reducer