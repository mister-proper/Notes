import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: [],
    text: {titleValue: '', textValue: '', fixed: false},
    filtered: [],
    fixed: [],
}

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        notesSetText: (state, action) => {
            state.text = action.payload;
        },
        notesSetNotes: (state, action) => {
            state.notes = action.payload;
        },
        notesFiltered: (state, action) => {
            state.filtered = action.payload;
        },
        notesFixed: (state, action) => {
            state.fixed = action.payload;
        }
    }
})

const {actions, reducer} = notesSlice;

export default reducer;

export const {
    notesSetText,
    notesSetNotes,
    notesFiltered,
    notesFixed
} = actions;