import { useEffect, useMemo } from 'react';
import { notesSetNotes } from '../../slice/notesSlice';
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
        }else{
            localStorage.removeItem('items');
        }
    }, [notes])

    function setFixed (id) {
        let fixed = notes.map((item) => {

            if(item.id === id) {
                return {...item, fixed: true};
            }
            return item;
        })
        dispatch(notesSetNotes(fixed))
    }

    //Рендерим елементи на сторінку

    const renderItems = useMemo(() =>{
        return filtered.map((item, index) => {
            let {titleValue, textValue, id, color, fixed} = item;

            if(fixed) {
                return false;
            }

            return (
                <div key={index + id} style={{backgroundColor: color}} className="card-notice__items">
                    <div onClick={() => setFixed(id)} className="card-notice__fixed">
                        <svg
                            width={24}
                            height={24}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 268.476 268.476"
                            style={{
                                enableBackground: "new 0 0 268.476 268.476",
                            }}
                            xmlSpace="preserve"
                            >
                            <path
                                fill='grey'
                                style={{
                                    fillRule: "evenodd",
                                    clipRule: "evenodd",
                                }}
                                d="M201.357 143.187s.001-53.224-42.957-53.224h-1.789V62.644c14.828 0 26.848-12.02 26.848-26.848v-8.949C183.458 12.02 171.438 0 156.611 0h-44.746C97.037 0 85.017 12.02 85.017 26.848v8.949c0 14.828 12.02 26.848 26.848 26.848v27.318h-1.79c-42.955 0-42.955 53.224-42.955 53.224h53.695v98.442l13.424 26.847 13.424-26.847v-98.442h53.694z"
                                />
                        </svg>
                    </div>
                    <div className="card-notice__heading">
                        <h2 className="card-notice__title">{titleValue}</h2>
                    </div>
                    <div className="card-notice__text">
                        <p className="card-notice__paragraph">{textValue}</p>
                    </div>
                    <OptionBar id={id} color={color}/>
                </div>
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtered]);

    return (
        <div className='card-notice'>
            <div className="card-notice__title">
                Всі нотатки:
            </div>
            <div className="card-notice__inner">
                {renderItems}
            </div>
            {checkVieEdit && <EditNotice/>}
        </div>

    );
};

export default CardNotice;