import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editValue: {},
    checkVieEdit: false
}

const editNotesSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {
       editSetValue: (state, action) => {
            state.editValue = action.payload;
       },
       editCheckVie: (state, action) => {
            state.checkVieEdit = action.payload;
       }
       
    }
})

const {actions, reducer} = editNotesSlice;

export default reducer;

export const {
    editSetValue,
    editCheckVie
} = actions;