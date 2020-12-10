import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import cn from 'classnames';
import Form from './Form';
import FormInputWithError from './FormInputWithError';

function Login ({ onLogin, loggedIn, isInfoTooltipOpen }) {
  const themeModificator = "dark";
  const actModificator = "identification";

  const fieldsetClassName = cn(
    'form__fieldset',
    {[`form__fieldset_theme_${themeModificator}`]: themeModificator},
    {[`form__fieldset_act_${actModificator}`]: actModificator},
  );
  
  // При загрузке страницы, если пользователь залогинен, переадрисовываем его на главную
  // Сделала так, чтобы была возможность зайти на гипотетический другие (кроме главной)
  // страницы из адресной строки.
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, []);

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleDataChange = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    })
  };

  const handleSubmit = () => {
    onLogin(data);
  }

  return (
    <>
      <Form
        themeModificator={themeModificator}
        actModificator={actModificator}
        children
        name="login"
        title="Вход"
        submitTitle="Войти"
        submitLoadingTitle="Вход..."
        isSubmitActive={false}
        onSubmit={handleSubmit}
        isInfoTooltipOpen={isInfoTooltipOpen}
      >
        <fieldset className={fieldsetClassName}>
          <FormInputWithError
            themeModificator={themeModificator}
            actModificator={actModificator}
            name="email"
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={handleDataChange}
          />
          <FormInputWithError
            themeModificator={themeModificator}
            actModificator={actModificator}
            name="password"
            type="password"
            placeholder="Пароль"
            minLength="6"
            maxLength="50"
            value={data.password}
            onChange={handleDataChange}
          />
        </fieldset>
      </Form>
    </>
  )
}

export default Login;
