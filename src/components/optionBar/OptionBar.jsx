import { Button } from '../reusableComponents/ReusableComponents';
import { useDispatch, useSelector } from 'react-redux';
import { notesSetNotes } from '../../slice/notesSlice';
import { editSetValue, editCheckVie } from '../../slice/editNotesSlice';
import ChooseColors from '../chooseColor/ChooseColor';
import '../optionBar/optionBar.scss';

const OptionBar = ({id, color}) => {
    console.log('option');

    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);

    function onDeleteItem(elDelete) {
        const deleteItem = notes.filter((note) => note.id !== elDelete);
        dispatch(notesSetNotes(deleteItem));
        localStorage.setItem('items', JSON.stringify(deleteItem));
    };

    function setEditValue (id) {
        const objValue = notes.filter(note => note.id === id);
        dispatch(editSetValue(...objValue));
        dispatch(editCheckVie(true));
        document.body.style.overflow='hidden';
    };

    return (
        <div className="option card-notice__option">
            <div className="card-notice__btn">
                <Button className="option__btn card-notice__remove"
                    onClick={() => onDeleteItem(id)}/>
            </div>

            <div className="card-notice__btn">
                <Button className="option__btn card-notice__edit"
                        onClick={() => setEditValue(id)}/>
            </div>

            <div className="card-notice__btn">
                <ChooseColors color={color} id={id}/>
            </div>
        </div>
    )
}

export default OptionBar;