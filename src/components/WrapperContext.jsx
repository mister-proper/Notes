import { useState } from 'react';
import {SignUp, ComeIn} from '../components/singUp/SingUp';
import Context from '../../src/context';

const WrapperContext = (props) => {
    const [notes, setNotes] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [viewSingUp, setViewSignUp] = useState(false);
    const [viewComeIn, setViewComeIn] = useState(false);
    const [profile, setProfile] = useState({});
    const [viewProfile, setViewProfile] = useState(false);

    return (
        <Context.Provider value={{notes, setNotes, filtered, setFiltered, viewSingUp, setViewSignUp, viewComeIn, setViewComeIn,profile, setProfile, viewProfile, setViewProfile}}>
            {props.children}
            {viewSingUp && <SignUp/>}
            {viewComeIn && <ComeIn/>}
        </Context.Provider>
    )
}

export default WrapperContext;