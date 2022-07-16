import {useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notesSetText, notesSetNotes} from '../../slice/notesSlice';
import '../addNotice/AddNotice.scss';

const AddNotice = () => {
    const dispatch = useDispatch();
    const text = useSelector(state => state.notes.text);
    const notes = useSelector(state => state.notes.notes);

    const focusInStartPage = useRef(null);
    const focusNextInput = useRef(null);

    console.log('add');

    useEffect(() => {
        const id = generationId();
        dispatch(notesSetText({...text, id}))
        focusInStartPage.current.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notes]);

    // Генерація id
    function generationId  () {
        let id = Math.random().toString(16).slice(2);
        return id;
    }

    function addNotice() { 
        if(checkOnValue() === false) return false;
        dispatch(notesSetNotes([...notes, text]))
        dispatch(notesSetText({...text, titleValue: '', textValue: ''}))
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
            dispatch(notesSetText({...text, titleValue: '', textValue: ''}))

            setTimeout(() => {
                document.querySelectorAll('.add-notice_focus').forEach(item => {
                    item.classList.remove('error');
                })
            }, 1500)
            return false;
        }
    }

    function removeAllAnimation () {
        let a = document.querySelector('.add-notice__wave');
        if(a !== null) a.remove();
    }

    function addAnimation () {
        removeAllAnimation();
        const container = document.querySelector('.add-notice__wave-wrap');
        const div = document.createElement('div');
        div.classList.add('add-notice__wave');
        container.appendChild(div);
        setTimeout(() => div.remove() , 1000);
    }

    return (
        <>
            <div className="add-notice">
                <div className="container">
                    <div className="add-notice__inner">
                        <div className="add-notice__top">
                            <button className="add-notice__btn" 
                                onClick={(e) =>{
                                    addNotice()
                                    addAnimation()}}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={45.402}
                                        height={45.402}
                                        style={{
                                        enableBackground: "new 0 0 45.402 45.402",
                                        }}
                                        xmlSpace="preserve"   
                                        >
                                        <path
                                        d="M41.267 18.557H26.832V4.134A4.127 4.127 0 0 0 22.707 0a4.126 4.126 0 0 0-4.124 4.135v14.432H4.141a4.137 4.137 0 0 0-4.138 4.135 4.143 4.143 0 0 0 1.207 2.934 4.122 4.122 0 0 0 2.92 1.222h14.453V41.27c0 1.142.453 2.176 1.201 2.922a4.11 4.11 0 0 0 2.919 1.211 4.13 4.13 0 0 0 4.129-4.133V26.857h14.435c2.283 0 4.134-1.867 4.133-4.15-.001-2.282-1.852-4.15-4.133-4.15z"
                                        fill="gray"
                                        />
                                    </svg>
                            </button>
                            <div className="add-notice__wave-wrap">
                            </div>
                        </div>
                        <div className="add-notice__bottom">
                            <p className="add-notice__text">Добавити нотаток</p>
                            <input 
                                ref={focusInStartPage}
                                className="add-notice__title add-notice_focus"  
                                type="text" 
                                placeholder='Назва'
                                value={text.titleValue || ''}
                                onChange={(e) => dispatch(notesSetText({...text,titleValue: e.target.value}))}
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
                                placeholder='Нова нотатка' 
                                spellCheck="true"
                                value={text.textValue || ''}
                                onChange={(e) => dispatch(notesSetText({...text,textValue: e.target.value}))}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter'){
                                        addNotice();
                                        focusNextInput.current.blur();
                                    }
                                }}
                                />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNotice;