import {configureStore} from '@reduxjs/toolkit';
import notes from '../slice/notesSlice';
import edit from '../slice/editNotesSlice'
import registration from '../slice/registrationSlice';
import profile from '../slice/profileSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

const store = configureStore({
    reducer: {notes, edit, registration, profile},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;