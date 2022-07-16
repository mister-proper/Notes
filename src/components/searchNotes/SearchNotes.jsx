import { useEffect, useState } from "react";
import { notesFiltered } from '../../slice/notesSlice';
import { useDispatch, useSelector } from 'react-redux';

const SearchNotes = () => {
    const dispatch = useDispatch();
    const Allnotes = useSelector(state => state.notes.notes);
    const [text, setText] = useState('');
    console.log('search')
    
    function filterNotes(notes, target) {
        let filtered = notes.filter(item => item.titleValue.includes(target))
        setText(target)
        dispatch(notesFiltered(filtered))
        disaledInputs(target)
    }
    
    const debounce = (fn, ms) => {
        let timeout;
        return function (...args) {
            
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                fn.apply(this, args)
            }, ms)
        }
    }
    
    useEffect(() => {
        filterNotes(Allnotes, text);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Allnotes]);


    function disaledInputs (target) {
        const inputs = document.querySelectorAll('.add-notice_focus');
        
        inputs.forEach(item => {
            if(target.length > 0){
                item.setAttribute("disabled", "disabled");
            }else{
                item.removeAttribute("disabled");
            }
        })
    }
    
    
    const debounceNotes = debounce(filterNotes, 300);
    return (
        <div className="search-notes">
            <input className="search-notes__input" 
                   placeholder="Шукати нотатку"
                   onChange={(e) => debounceNotes(Allnotes, e.target.value)}></input>
        </div>
    )
}

export default SearchNotes;