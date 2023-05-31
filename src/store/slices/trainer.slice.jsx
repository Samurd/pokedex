import { createSlice } from '@reduxjs/toolkit';

export const trainerSlice= createSlice({
	name: 'trainer',
    initialState: '',
    reducers: {
        setName: (state, action) => {
            const name = action.payload
            return name
        }
    }
})

export const { setName } = trainerSlice.actions;

export default trainerSlice.reducer;