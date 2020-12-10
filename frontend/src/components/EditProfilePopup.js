import React, { useState, useContext, useEffect } from "react";
import cn from 'classnames';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import FormInputWithError from "./FormInputWithError";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const themeModificator = "light";
  const actModificator = "activity";

  const fieldsetClassName = cn(
    'form__fieldset',
    {[`form__fieldset_theme_${themeModificator}`]: themeModificator},
    {[`form__fieldset_act_${actModificator}`]: actModificator},
  );

  // Используем контекст для установки начальных значений стейт-переменных для управляемых компонентов
  const currentUser = useContext(CurrentUserContext);
  
  const [name, setName] = useState(currentUser.name);
  const [info, setInfo] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setInfo(currentUser.about);
  }, [isOpen]);


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleInfoChange = (e) => {
    setInfo(e.target.value);
  };

  const handleSubmit = () => {
    onUpdateUser({
      name,
      about: info,
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitTitle="Сохранить"
      submitLoadingTitle="Сохранение..."
      isSubmitActive={true}
      themeModificator={themeModificator}
      actModificator={actModificator}
    >
      <fieldset className={fieldsetClassName}>
        <FormInputWithError
          name="name"
          placeholder="Имя"
          type="text"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
          themeModificator={themeModificator}
          actModificator={actModificator}
          textContent={name}
        />
        <FormInputWithError
          name="info"
          placeholder="Профессия"
          type="text"
          minLength="2"
          maxLength="200"
          value={info}
          onChange={handleInfoChange}
          themeModificator={themeModificator}
          actModificator={actModificator}
        />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
