import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: [],
    text: {titleValue: '', textValue: ''},
    filtered: []
}

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        notesSetText: (state, action) => {
            state.text = action.payload
        },
        notesSetNotes: (state, action) => {
            state.notes = action.payload;
        },
        notesFiltered: (state, actiom) => {
            state.filtered = actiom.payload
        }
    }
})

const {actions, reducer} = notesSlice;

export default reducer;

export const {
    notesSetText,
    notesSetNotes,
    notesFiltered
} = actions;