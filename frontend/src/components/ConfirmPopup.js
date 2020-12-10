import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ deletedCard, isOpen, onConfirmDelete, onClose }) {
  const handleSubmit = () => {
    onConfirmDelete(deletedCard);
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitTitle="Да"
      submitLoadingTitle="Удаление..."
      isSubmitActive={true}
      themeModificator="light"
      actModificator="activity"
    />
  );
}

export default ConfirmPopup;
