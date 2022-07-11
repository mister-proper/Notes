import { useEffect, useState } from "react";
import { createSelector } from 'reselect'
import { notesFiltered } from '../../slice/notesSlice';
import { useDispatch, useSelector } from 'react-redux';

const SearchNotes = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const notes = createSelector(
        (state) => state.notes.notes,
        (notes) => {
           return notes.filter(item => item.titleValue.includes(text));
        }
    );
    const Allnotes = useSelector(notes)

    console.log('search')

    useEffect(() => {
        disaledInputs();
        dispatch(notesFiltered(Allnotes))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, Allnotes]);

    function disaledInputs () {
        const inputs = document.querySelectorAll('.add-notice_focus');

        inputs.forEach(item => {
            if(text.length > 0){
                item.setAttribute("disabled", "disabled");
            }else{
                item.removeAttribute("disabled");
            }
        })
    }
    
    return (
        <div className="search-notes">
            <input className="search-notes__input" 
                   placeholder="Шукати нотатку"
                   onChange={(e) => setText(e.target.value)}></input>
        </div>
    )
}

export default SearchNotes;