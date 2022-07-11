import { useEffect } from 'react';
import { notesSetNotes } from '../../slice/notesSlice';
import { editSetValue, editCheckVie } from '../../slice/editNotesSlice';
import { useDispatch, useSelector } from 'react-redux';

import EditNotice from '../editNotice/EditNotice';
import OptionBar from '../optionBar/OptionBar';

const CardNotice = () => {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);
    const filtered = useSelector(state => state.notes.filtered);
    const checkVieEdit = useSelector(state => state.edit.checkVieEdit);

    console.log('card');
    
    useEffect(() => {
        if(localStorage.getItem('items') !== null){
            dispatch(notesSetNotes(JSON.parse(localStorage.getItem('items'))));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(notes.length > 0){
            localStorage.removeItem('items');
            localStorage.setItem('items', JSON.stringify(notes));
        }
    }, [notes])

    function onDeleteItem(elDelete) {
        const deleteItem = notes.filter((note) => note.id !== elDelete);
        
        localStorage.removeItem(elDelete);
        dispatch(notesSetNotes(deleteItem));
    };

    function setEditValue (id) {
        const objValue = notes.filter(note => note.id === id);
        dispatch(editSetValue(...objValue));
        dispatch(editCheckVie(true));
        document.body.style.overflow='hidden';
    };

    //Рендерим елементи на сторінку

    function renderItem (arr) {
        return arr.map((item, index) => {
            let {titleValue, textValue, id, color} = item;

            //Добавляєм елемент в localStorage

            // if(localStorage.getItem(index) !== null){
            //     localStorage.removeItem(index);
            //     localStorage.setItem(index, JSON.stringify(item));
            // }else{
            //     localStorage.setItem(index, JSON.stringify(item));
            // }

            return (
                <div key={index + id} style={{backgroundColor: color}} className="card-notice__inner">
                    <div className="card-notice__heading">
                        <h2 className="card-notice__title">{titleValue}</h2>
                    </div>
                    <div className="card-notice__text">
                        <p className="card-notice__paragraph">{textValue}</p>
                    </div>
                    <OptionBar id={id} color={color} setEditValue={setEditValue} onDeleteItem={onDeleteItem}/>
                </div>
            );
        });
    };

    const renderItems = renderItem(filtered);
    return (
        <>
            <div className="card-notice">
                {renderItems}
            </div>
            {checkVieEdit && <EditNotice/>}
        </>

    );
};

export default CardNotice;