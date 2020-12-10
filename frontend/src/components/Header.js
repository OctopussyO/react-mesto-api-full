import React, { useState } from "react";
import { Switch, Route, Link } from 'react-router-dom';
import cn from 'classnames';
import logoPath from "../images/logo.svg";
import hamburgerIconPath from '../images/icon-hamburger.svg';
import closeIconPath from '../images/icon-close.svg';

function Header({ userData, wasResponse, onLogout }) {
  // Реализация кнопки-гамбургера. Выбран такой способ, потому что не вижу смысла
  // подключать целую библиотеку react-responsive из-за одной маленькой фичи.
  const [isOpen, setOpenState] = useState(false);
  
  const controlBlockClassName = cn(
    'header__control',
    {'header__control_mobile_hidden': !isOpen}
  );

  const buttonBackgroundImageStyle = isOpen
    ? {backgroundImage: `url(${closeIconPath})`}
    : {backgroundImage: `url(${hamburgerIconPath})`};
  
  const handleMenuClick = () => setOpenState(!isOpen);
  
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logoPath}
        alt="Логотип проекта 'Место'"
      />
      {/* 
        Сейчас карточки и регистрация у нас расположены на двух разных серверах.
        Из-за этого возможен случай, когда карточки не загрузились, но пользователь может видеть
        свой email и нажать на "выйти", если залогинен или гулять по ссылкам "Регистрация"/"Вход",
        если не залогинен. Если приложение не загрузилось, то уж полностью.
      */}
      {wasResponse && 
        <Switch>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__link page__link">
              Регистрация
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link page__link">
              Вход
            </Link>
          </Route>
          <Route exact path="/">
            <div className={controlBlockClassName}>
              <p className="header__user-info">
                {userData.email}
              </p>
              <button className="header__button header__button_content_text" onClick={onLogout}>
                Выйти
              </button>
            </div>
            <button
              className="header__button header__button_content_image"
              style={buttonBackgroundImageStyle}
              onClick={handleMenuClick}
            />
          </Route>
        </Switch>
      }
    </header>
  );
}

export default Header;
