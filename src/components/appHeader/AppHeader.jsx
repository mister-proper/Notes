import { useContext } from 'react';
import Profile from '../profile/Profile';
import Context from '../../context';

const AppHeader = () => {
    const {viewSingUp ,setViewSignUp, viewComeIn, setViewComeIn} = useContext(Context);

    return (
        <div className="app-header">
            <button onClick={() => setViewSignUp(!viewSingUp)} className="app-header__sing">Регістрація</button>
            <span>|</span>
            <button onClick={() => setViewComeIn(!viewComeIn)} className="app-header__sing">Ввійти</button>
            <Profile/>
        </div>
    )
}

export default AppHeader;