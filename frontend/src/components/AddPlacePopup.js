import React, { useState } from "react";
import cn from 'classnames';
import FormInputWithError from "./FormInputWithError";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const themeModificator = "light";
  const actModificator = "activity";

  const fieldsetClassName = cn(
    'form__fieldset',
    {[`form__fieldset_theme_${themeModificator}`]: themeModificator},
    {[`form__fieldset_act_${actModificator}`]: actModificator},
  );

  // Стейт-переменные для управляемых компонентов
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  };
  
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = () => {
    onAddPlace({
      name: place,
      link,
    });
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitTitle="Создать"
      submitLoadingTitle="Сохранение..."
      isSubmitActive={false}
      themeModificator={themeModificator}
      actModificator={actModificator}
    >
      <fieldset className={fieldsetClassName}>
        <FormInputWithError
          name="place"
          placeholder="Название"
          type="text"
          minLength="1"
          maxLength="30"
          value={place}
          onChange={handlePlaceChange}
          themeModificator={themeModificator}
          actModificator={actModificator}
        />
        <FormInputWithError
          name="link"
          placeholder="Ссылка на картинку"
          type="url"
          value={link}
          onChange={handleLinkChange}
          themeModificator={themeModificator}
          actModificator={actModificator}
        />
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
