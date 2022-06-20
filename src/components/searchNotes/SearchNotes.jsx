import { useEffect, useState, useContext } from "react";
import Context from '../../context';

const SearchNotes = () => {
    const {notes, setFiltered} = useContext(Context);
    const [text, setText] = useState('');
    console.log('search')

    useEffect(() => {
        disaledInputs();
        localStorage.clear();
        setFiltered(getFilterdNotes);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, notes]);

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
    
    const getFilterdNotes = notes.filter(item => item.titleValue.includes(text));
    
    return (
        <div className="search-notes">
            <input className="search-notes__input" 
                   placeholder="Шукати нотатку"
                   onChange={(e) => setText(e.target.value)}></input>
        </div>
    )
}

export default SearchNotes;