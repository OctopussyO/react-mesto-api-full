import React, { useRef, useState } from "react";
import cn from 'classnames';
import PopupWithForm from "./PopupWithForm";
import FormInputWithError from "./FormInputWithError";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const themeModificator = "light";
  const actModificator = "activity";

  const fieldsetClassName = cn(
    'form__fieldset',
    {[`form__fieldset_theme_${themeModificator}`]: themeModificator},
    {[`form__fieldset_act_${actModificator}`]: actModificator},
  );

  const avatarRef = useRef();
  const [avatar, setAvatar] = useState("");

  const handleAvatarChange = () => {
    setAvatar(avatarRef.current.value);
  };

  const handleSubmit = () => {
    onUpdateAvatar({
      avatar: avatar,
    });
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitTitle="Сохранить"
      submitLoadingTitle="Сохранение..."
      isSubmitActive={false}
      themeModificator={themeModificator}
      actModificator={actModificator}
    >
      <fieldset className={fieldsetClassName}>
        <FormInputWithError
          name="avatar"
          placeholder="Ссылка на аватар"
          type="url"
          value={avatar}
          inputRef={avatarRef}
          onChange={handleAvatarChange}
          themeModificator={themeModificator}
          actModificator={actModificator}
        />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
