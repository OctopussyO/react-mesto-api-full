import React from 'react';
import Form from './Form';

function EnterForm ({ isNewUser }) {
  return (
    <Form formSelector="enter-form">
      <h2 className="enter-form__heading">
        {isNewUser ? 'Регистрация': 'Вход'}
      </h2>
      <input
        className="enter-form__input"
        name="email"
        type="email"
        placeholder="Email"
      />
      <input
        className="enter-form__input"
        name="password"
        type="password"
        placeholder="Пароль"
      />
      <button className="enter-form__submit-btn">
        {isNewUser ? 'Зарегистрироваться' : 'Войти'}
      </button>
    </Form>
  )
}

export default EnterForm;