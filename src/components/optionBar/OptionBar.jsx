import { Button } from '../reusableComponents/ReusableComponents';
import ChooseColors from '../chooseColor/ChooseColor';
import '../optionBar/optionBar.scss';

const OptionBar = ({id, color, setEditValue, onDeleteItem}) => {
    console.log('option');

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