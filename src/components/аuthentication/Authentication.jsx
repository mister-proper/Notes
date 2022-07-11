import { useDispatch, useSelector } from 'react-redux';
import { registrationViewComeIn, registrationViewSignUp } from '../../slice/registrationSlice';
import { profileSetView, profileSetValue } from '../../slice/profileSlice';



export const SignUp = () => {
    const dispatch = useDispatch();

    const viewSignUp = useSelector(state => state.registration.viewSignUp);
	const viewSignIn = useSelector(state => state.registration.viewSignIn);


    function validForm(input){
        let error = [];

        if(input.login.value.length <= 8 || !input.login.value.match(/[a-z]/g)){
            error.push(input.login);
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.email.value)){
            error.push(input.email);
        }
        if(input.password.value.length <= 8){
            error.push(input.password);
        }
        return error;
    }


    function messageForInput(input) {
        input.style.border = '1px solid red';
        setTimeout(() => {
            input.style.border = '1px solid gray';
        },3000)
    }

    function setCookie(name, value, options = {}) {
        options = {
          path: '/',
          // при необходимости добавьте другие значения по умолчанию
          ...options
        };
      
        if (options.expires instanceof Date) {
          options.expires = options.expires.toUTCString();
        }
      
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      
        for (let optionKey in options) {
          updatedCookie += "; " + optionKey;
          let optionValue = options[optionKey];
          if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
          }
        }
        document.cookie = updatedCookie;
    }

   function addUsers (e) {
        e.preventDefault();

        const forms = document.querySelector('form').elements;
        const form = document.querySelector('.form');

        let user = {
            'login': forms.login.value,
            'email': forms.email.value,
            'password': forms.password.value
        }

        if(validForm(forms).length > 0){
            validForm(forms).forEach(item => {
                messageForInput(item);
            })
            return false;
        }

        fetch('/signUp',{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(res => {
            if(res.status === 200){
                dispatch(profileSetValue(user.login))
                dispatch(registrationViewSignUp(!viewSignUp))
                dispatch(profileSetView(true))
                setCookie('login', user.login, {'max-age': 3600});
            }
        })
        .catch((e) => console.error(e))
        .finally(() => form.reset())

    }

    

    return (
        <div className="sign-up">
            <div className="cover"></div>
            <div className="sign-up__container">
                <div onClick={() => dispatch(registrationViewSignUp(!viewSignUp))} className="sign-up__close">X</div>
                <h2 className="sign-up__title">Регістрація /  <span onClick={() => {
                                                                            dispatch(registrationViewSignUp(!viewSignUp));
                                                                            dispatch(registrationViewComeIn(!viewSignIn))}}>Ввійти</span></h2>
                <form onSubmit={(e) => addUsers(e)} className="sign-up__form form">
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
    const dispatch = useDispatch();

    const viewSignUp = useSelector(state => state.registration.viewSignUp);
	const viewComeIn = useSelector(state => state.registration.viewComeIn);

    function setCookie(name, value, options = {}) {
        options = {
          path: '/',
          // при необходимости добавьте другие значения по умолчанию
          ...options
        };
      
        if (options.expires instanceof Date) {
          options.expires = options.expires.toUTCString();
        }
      
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      
        for (let optionKey in options) {
          updatedCookie += "; " + optionKey;
          let optionValue = options[optionKey];
          if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
          }
        }
        document.cookie = updatedCookie;
    }


    function ComeIn (e) {
        e.preventDefault();

        const forms = document.querySelector('form').elements;

        let user = {
            'login': forms.login.value,
            'password': forms.password.value
        }

        fetch('/signIn',{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(res => {
            if(res.status === 200){
                dispatch(profileSetValue(user.login))
                dispatch(registrationViewComeIn(!viewComeIn))
                dispatch(profileSetView(true))
                setCookie('login', user.login, {'max-age': 3600});
            }
        })
    }

    return (
        <div className="sign-up">
            <div className="cover"></div>
            <div className="sign-up__container">
                <div onClick={() => 
                                dispatch(registrationViewComeIn(!viewComeIn))} className="sign-up__close">X</div>
                <h2 className="sign-up__title">Ввійти /  <span onClick={() => {
                                                                        dispatch(registrationViewSignUp(!viewSignUp));
                                                                        dispatch(registrationViewComeIn(!viewComeIn))}}>Регістрація</span></h2>
                <form onSubmit={(e) => ComeIn(e)} className="sign-up__form form">
                    <div className="form__container form_flex-start">
                        <input type="text" className="form__nickname" name='login' placeholder="Імя користувача" required/>
                        <input type="text" className="form__password" name='password' placeholder="Пароль" required/>
                    </div>
                    <button className="form__btn">Ввійти</button>
                </form>
            </div>
        </div>
    )
}

export const ViewAuthentication = () => {

    const viewSignUp = useSelector(state => state.registration.viewSignUp);
	const viewComeIn = useSelector(state => state.registration.viewComeIn);

    return (
        <>
            {viewSignUp && <SignUp/>}
            {viewComeIn && <ComeIn/>}
        </>
    )
}


