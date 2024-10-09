import { createSlice } from '@reduxjs/toolkit'

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        allRooms: []
    },
    reducers: {
        roomList: (state, action) => {
            state.allRooms = [...action.payload]
        }
    }
})

export const { roomList } = roomSlice.actions;
export default roomSlice.reducer;