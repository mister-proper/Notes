import { useSelector, useDispatch } from "react-redux";
import { notesSetNotes } from '../../slice/notesSlice';
import { useMemo } from "react";
import OptionBar from '../optionBar/OptionBar';

const FixedNotes = () => {
    const dispatch = useDispatch();
    const filtered = useSelector(state => state.notes.filtered);

    function deleteFixed (id) {
        let fixed = filtered.map((item) => {

            if(item.id === id) {
                return {...item, fixed: false};
            }
            return item;
        })
        dispatch(notesSetNotes(fixed))
    }

    function fixedRender(arr) {
        return arr.map((item, index) => {
            let {titleValue, textValue, id, color, fixed} = item;

                if(!fixed) return false;

            return (
                <div key={index + id} style={{backgroundColor: color}} className="card-notice__items">
                    <div onClick={() => deleteFixed(id)} className="card-notice__fixed">
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
        })
    }

    const items =  useMemo(() => fixedRender(filtered), [filtered]);
    
    return (
        <div className="fixed" style={{maxWidth: '1620px', margin: '0 auto'}}>
            {items.sort()[0] !== false ? <h2 className="fixed__title">Закріплені нотатки:</h2> : null}
            <div className="fixed__inner card-notice__inner">
            {
               items 
            }
            </div>
        </div>
    )
}

export default FixedNotes;