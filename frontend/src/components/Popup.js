import React, { useEffect } from 'react';
import cn from 'classnames';

function Popup ({
  children,
  name=null,
  onClose,
  isOpen,
  isImageInside=false,
  isFormInside=false,
  isTooltipInside=false
}) {
  const popupClassName = cn(
    'popup',
    {'popup_active': isOpen},
    {'popup_with_form': isFormInside},
    {'popup_with_image': isImageInside},
    {'popup_with_tooltip': isTooltipInside}
  );

  const containerClassName = cn(
    'popup__container',
    {'popup__container_with_image': isImageInside},
    {'popup__container_with_form': isFormInside},
    {'popup__container_with_tooltip': isTooltipInside}
  );

  // Обработчик клика по оверлею
  const handleOverlayPopupClick = (evt) => {
    if (!evt.target.closest(".popup__container")) {
      onClose();
    }
  };

  // Обработчик нажатия клавиши "Escape"
  const handleEscape = (evt) => {
    if (evt.key === "Escape") {
      onClose();
    }
  };

  // Используем хук эффекта для закрытия модалки по нажатию клавиши "Escape"
  useEffect(() => {
    document.body.addEventListener("keydown", handleEscape);
    return () => {
      document.body.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      className={popupClassName}
      onMouseDown={handleOverlayPopupClick}
    >
      <div className={containerClassName}>
        {children}
        <button
          className="popup__close-button page__button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  )
}

export default Popup;
