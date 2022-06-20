import '../cardNotice/CardNotice.scss';
import { useEffect, useContext, useState, useMemo} from 'react';
import Context from '../../context';
import EditNotice from '../editNotice/EditNotice';
import OptionBar from '../optionBar/OptionBar';

const CardNotice = () => {
    const {notes, setNotes, filtered} = useContext(Context);
    const [checkVieEdit, setCheckVieEdit] = useState(false);
    const [edit, setEdit] = useState({});
    console.log('card');

    useEffect(() => {
        const items = {...localStorage};
        for(let key in items){
            setNotes(notes => [...notes, JSON.parse(items[key])]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function onDeleteItem(elDelete) {
        const deleteItem = notes.filter((note) => note.id !== elDelete);
        setNotes(deleteItem);
    };

    function setEditValue (id) {
        const objValue = notes.filter(note => note.id === id);
        setEdit(...objValue);
        setCheckVieEdit(true);
        document.body.style.overflow='hidden';
    };

    //Рендерим елементи на сторінку

    function renderItem (arr) {
        return arr.map((item, index) => {
            let {titleValue, textValue, id, color} = item;

            // Добавляєм елемент в localStorage
            if(localStorage.getItem(index) === null){
                const objStorage = JSON.stringify(item);
                localStorage.setItem(index, objStorage);
            };

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

    const renderItems = useMemo(() => renderItem(filtered), [filtered]);
    return (
        <>
            <div className="card-notice">
                {renderItems}
            </div>
            {checkVieEdit && <EditNotice edit={edit} setCheckVieEdit={setCheckVieEdit}/>}
        </>

    );
};

export default CardNotice;