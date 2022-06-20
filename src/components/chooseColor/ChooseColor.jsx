import {Color, Button} from '../reusableComponents/ReusableComponents';
import { useEffect, useContext } from 'react';
import Context from '../../context';

import './chooseColor.scss';

const ChooseColors = ({color, id}) => {

    console.log('choose')
    const {notes, setNotes} = useContext(Context);

    const colors = [
        {color: '#e3e3e3'},
        {color: '#47b0e4'},
        {color: '#e74949'},
        {color: '#bfa8eb'},
        {color: '#add'},
    ];

    useEffect(() => {
        document.body.addEventListener('click', (e) => {
            if(!e.target.classList.contains('option__btn')){
                closeAllChooseColorModal();
            }
        })
    }, []);

    function changeColor(color, id, target) {
        const newColor = notes.map((item) => {
            if(item.id === id){
                item.color = color;
            }
            return item;
        })
        removeAllActiveColor(target);
        target.classList.add('card-notice_active-color');
        setNotes(newColor);
    };

    function setActiveColorModal(target) {
        if(target.nextSibling.style.display === 'none'){
            closeAllChooseColorModal();
            target.nextSibling.style.display = 'block';
        }else{
            target.nextSibling.style.display = 'none';
        }
    };

    function removeAllActiveColor(target) {
        let color = target.parentNode.querySelectorAll('.choose-color-notice__color');

        color.forEach(item => {
            item.classList.remove('card-notice_active-color');
        })
    };
    
    function closeAllChooseColorModal () {
        const allColorBar = document.querySelectorAll('.choose-color-notice');
        allColorBar.forEach(item => {
            item.style.display = 'none';
        })
    };

    return (
        <>
            <Button className="option__btn card-notice__choose-color"
                            onClick={(e) => setActiveColorModal(e.target)}/>
            <div className="choose-color-notice" style={{display: 'none'}}>
                <div className="choose-color-notice__inner">
                    {colors.map((item, index) => {
                        return <Color key={item.color} 
                            className={item.color === color || (index === 0 && color === undefined) ? 'card-notice_active-color choose-color-notice__color' : 'choose-color-notice__color'}
                            data-color={item.color}
                            color={item.color}
                            onClick={(e) => changeColor(e.target.getAttribute('data-color'), id, e.target)}/>
                    })}
                </div>
            </div>
        </>
    )
}

export default ChooseColors;