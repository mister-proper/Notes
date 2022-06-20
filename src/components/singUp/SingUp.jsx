import { submitForm} from "../../service/service";
import { useContext } from 'react';
import Context from '../../context';
//import { getLogin } from "../../service/router";



export const SignUp = () => {
    const {viewSingUp ,setViewSignUp, viewComeIn, setViewComeIn} = useContext(Context);

    return (
        <div className="sign-up">
            <div className="cover"></div>
            <div className="sign-up__container">
                <div onClick={() => setViewSignUp(!viewSingUp)} className="sign-up__close">X</div>
                <h2 className="sign-up__title">Регістрація /  <span onClick={() => {
                                                                            setViewSignUp(!viewSingUp);
                                                                            setViewComeIn(!viewComeIn);}}>Ввійти</span></h2>
                <form onSubmit={(e) => submitForm(e)} className="sign-up__form form">
                    <div className="form__container">
                        <input type="text" className="form__email" name='email' placeholder="Пошта" required/>
                        <input type="text" className="form__nickname" name='login' placeholder="Імя користувача" required/>
                        <input type="text" className="form__password" name='password' placeholder="Пароль" required/>
                    </div>
                    <button className="form__btn">Регістрація</button>
                </form>
            </div>
        </div>
    )
}

export const ComeIn = () => {
    const {viewSingUp ,setViewSignUp, viewComeIn, setViewComeIn} = useContext(Context);

    return (
        <div className="sign-up">
            <div className="cover"></div>
            <div className="sign-up__container">
                <div onClick={() => 
                                setViewComeIn(!viewComeIn)} className="sign-up__close">X</div>
                <h2 className="sign-up__title">Ввійти /  <span onClick={() => {
                                                                        setViewComeIn(!viewComeIn);
                                                                        setViewSignUp(!viewSingUp);}}>Регістрація</span></h2>
                <form className="sign-up__form form">
                    <div className="form__container form_flex-start">
                        <input type="text" className="form__nickname" placeholder="Імя користувача"/>
                        <input type="text" className="form__password" placeholder="Пароль"/>
                    </div>
                    <button className="form__btn">Ввійти</button>
                </form>
            </div>
        </div>
    )
}


