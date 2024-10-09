import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        user: null
    },
    reducers: {
        userProfile: (state, action) => {
            state.user = {...action.payload}
        }
    }
})

export const { userProfile } = userSlice.actions;
export default userSlice.reducer;