import { useState } from 'react';
import { notesSetNotes } from '../../slice/notesSlice';
import { editCheckVie } from '../../slice/editNotesSlice';
import { useDispatch, useSelector } from 'react-redux'; 

const EditNotice = () => {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);
    const editValues = useSelector(state => state.edit.editValue);

    const {titleValue, textValue, id, color, fixed} = editValues;
    const [editValue, setEditValue] = useState({titleValue:titleValue, textValue: textValue, id: id, color: color, fixed: fixed});

    console.log('edit');
    function compliteEditNotes (){
        if(editValue.titleValue === ''){
            checkForEmpty(); 
            return;
        };

        const newNotes = notes.map(item => {
            if(item.id === id){
                return editValue;
            }
            return item;
        })
        dispatch(editCheckVie(false));
        dispatch(notesSetNotes(newNotes));
        document.body.style.overflow= '';
    }

    function checkForEmpty () {
        let title = document.querySelector('.edit__title');
        title.innerHTML = "Введіть 'Назву' нотатки";
        title.style.borderBottom = '2px solid red';

        setTimeout(() => {
            title.innerHTML = "Змініть Заголовок або Текст нотатки!";
            title.style.borderBottom = '2px solid';
        }, 3000);
    }
    
    return (
        <div className="edit">
            <div className="edit__cover"></div>
            <div className="edit__form">
                <h2 className="edit__title">Змініть Заголовок або Текст нотатки!</h2>
                <input
                    defaultValue={editValue.titleValue}
                    className="edit__input"  
                    type="text"
                    onChange={(e) => setEditValue({...editValue, titleValue: e.target.value})}/>
                    
                <textarea
                    defaultValue={editValue.textValue} 
                    className='edit__text-area' 
                    spellCheck="true"
                    onChange={(e) => setEditValue({...editValue, textValue: e.target.value})}></textarea>
                <div className="edit__btns">
                    <button className='edit__form-btn'
                        onClick={() => {
                            dispatch(editCheckVie(false));
                            document.body.style.overflow= '';}}>Відміна</button>
                    <button className='edit__form-btn'
                        onClick={() => compliteEditNotes()} >Зберегти</button>
                </div>
            </div>
        </div>
    )
}

export default EditNotice;