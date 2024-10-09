import { configureStore } from '@reduxjs/toolkit'
import { roomSlice } from './slices/room'
import { userSlice } from './slices/users'

export const store = configureStore({
    devTools: true,
    reducer: {
        roomList: roomSlice.reducer,
        userProfile: userSlice.reducer
    }
})