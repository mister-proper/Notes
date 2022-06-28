import { useContext } from 'react';
import Context from '../../context';

const ProfileMenu = () => {
    const {setViewProfile} = useContext(Context);

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

    function deleteCookie(name) {
        setCookie(name, "", {
          'max-age': -1
        })
    }

    return (
        <div className="profile__menu">
            <ul className="profile__list">
                <li onClick={() => {setViewProfile(false);
                                    deleteCookie('login')}} className="profile__item">Вийти</li>
            </ul>
        </div>
    )
}

export default ProfileMenu