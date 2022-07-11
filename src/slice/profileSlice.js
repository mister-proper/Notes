import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileValue: '',
    profileView: false,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
       profileSetView: (state, action) => {
            state.profileView = action.payload;
       },
       profileSetValue: (state, action) => {
            state.profileValue = action.payload;
       }
    }
})

const {actions, reducer} = profileSlice;

export default reducer;

export const {
    profileSetView,
    profileSetValue
} = actions;