import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    viewSingUp: false,
    viewComeIn: false,
}

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        registrationViewSignUp: (state, action) => {
            state.viewSignUp = action.payload;
        },
        registrationViewComeIn: (state, action) => {
            state.viewComeIn = action.payload;
        }   
    }
})

const {actions, reducer} = registrationSlice;

export default reducer;

export const {
    registrationViewSignUp,
    registrationViewComeIn
} = actions;