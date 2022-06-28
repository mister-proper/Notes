import { useContext, useState, useEffect } from 'react';
import Profile from '../profile/Profile';
import Context from '../../context';

const AppHeader = () => {
    const {viewProfile, setProfile, setViewProfile} = useContext(Context);

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
            setProfile({login: userLogin});
            setViewProfile(true)
        }
    }, [])

    return (
        <div className="app-header">
            {viewProfile ? <Profile/>: <Registration/>}
        </div>
    )
}

const Registration = () => {
    const {viewSingUp ,setViewSignUp, viewComeIn, setViewComeIn, viewProfile} = useContext(Context);

    return (
        <div className="registration">
            <button onClick={() => setViewSignUp(!viewSingUp)} className="registration__sing">Регістрація</button>
            <span>|</span>
            <button onClick={() => setViewComeIn(!viewComeIn)} className="registration__sing">Ввійти</button>
            {viewProfile && <Profile/>}
        </div>
    )
}

export default AppHeader;