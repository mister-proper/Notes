import {useState, useEffect, useContext, useRef} from 'react';
import Context from '../../context';
import '../addNotice/AddNotice.scss';

const AddNotice = () => {
    const {notes, setNotes} = useContext(Context);
    const [text, setText] = useState({titleValue: '', textValue: ''});
    const focusInStartPage = useRef(null);
    const focusNextInput = useRef(null);

    console.log('add');

    useEffect(() => {
        const id = generationId();
        setText(text => ({...text, id}));
        focusInStartPage.current.focus();
    }, [notes]);

    // Генерація id
    function generationId  () {
        let id = Math.random().toString(16).slice(2);
        return id;
    }

    function addNotice() { 
        if(checkOnValue() === false) return false;
        setNotes(notes => [...notes, text]);
        setText({...text, titleValue: '', textValue: ''}); 
    }

    function showStatusInputs(addClass) {
        document.querySelectorAll('.add-notice_focus').forEach((item, index) => {
            if(item.value === '' && index === 0){
               item.classList.add(addClass);
               return false;
            }
            item.classList.add(addClass);
        })
    }

    function checkOnValue() {
        if((text.titleValue === '' && text.textValue === '') || text.titleValue === ''){
            showStatusInputs('error');

            setTimeout(() => {
                document.querySelectorAll('.add-notice_focus').forEach(item => {
                    item.classList.remove('error');
                })
            }, 3000)
            return false;
        }
    }

    return (
        <>
            <div className="add-notice">
                <div className="container">
                    <div className="add-notice__inner">
                        <div className="add-notice__top">
                            <button className="add-notice__btn" 
                                onClick={() => addNotice()}
                                ></button>
                        </div>
                        <div className="add-notice__bottom">
                            <p className="add-notice__text">Добавити нотаток</p>
                            <input 
                                ref={focusInStartPage}
                                className="add-notice__title add-notice_focus"  
                                type="text" 
                                placeholder='Назва'
                                value={text.titleValue}
                                onChange={(e) => setText({...text,titleValue: e.target.value})}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter'){
                                        focusNextInput.current.focus();
                                        e.preventDefault()
                                    }
                                }}
                                />

                            <textarea
                                ref={focusNextInput} 
                                type="text"
                                className='add-notice__text-area add-notice_focus' 
                                wrap='hard'
                                name='area' 
                                placeholder='Нова нотатка' 
                                spellCheck="true"
                                value={text.textValue}
                                onChange={(e) => setText({...text,textValue: e.target.value})}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter'){
                                        addNotice();
                                        focusNextInput.current.blur();
                                    }
                                }}
                                ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNotice;