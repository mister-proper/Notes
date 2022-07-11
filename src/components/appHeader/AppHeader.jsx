import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileSetView, profileSetValue } from '../../slice/profileSlice';
import { registrationViewComeIn, registrationViewSignUp } from '../../slice/registrationSlice';
import Profile from '../profile/Profile';

const AppHeader = () => {
    const dispatch = useDispatch();
    const profileView = useSelector(state => state.profile.profileView);

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    useEffect(() => {
        if(document.cookie === ''){
            return;
        }else{
            const userLogin = getCookie('login');
            dispatch(profileSetValue(userLogin));
            dispatch(profileSetView(true));
        }
    }, [])

    return (
        <div className="app-header">
            <p onClick={() => {
                localStorage.removeItem('items')
                window.location.reload()}} className="app-header__clear">Видалити всі нотатки</p>
            {profileView ? <Profile/>: <Registration/>}
        </div>
    )
}

const Registration = () => {
    const dispatch = useDispatch();
    const profileView = useSelector(state => state.profile.profileView);
    const viewSignUp = useSelector(state => state.registration.viewSignUp);
	const viewSignIn = useSelector(state => state.registration.viewSignIn);

    return (
        <div className="registration">
            <button onClick={() => dispatch(registrationViewSignUp(!viewSignUp))} className="registration__sing">Регістрація</button>
            <span>|</span>
            <button onClick={() => dispatch(registrationViewComeIn(!viewSignIn))} className="registration__sing">Ввійти</button>
            {profileView && <Profile/>}
        </div>
    )
}

export default AppHeader;