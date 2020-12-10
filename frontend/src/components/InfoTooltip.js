import React from 'react';
import Popup from './Popup';
import okIconPath from '../images/icon-ok.svg';
import notOkIconPath from '../images/icon-not-ok.svg';

function InfoTooltip ({ isSuccess, message, isOpen, onClose }) {
  const backgroundImageStyles = isSuccess
    ? {backgroundImage: `url(${okIconPath})`}
    : {backgroundImage: `url(${notOkIconPath})`}

  const notOkMessage = message ? message : 'Что-то пошло не так! Попробуйте ещё раз.';
  return (
    <Popup
      isTooltipInside={true}
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="popup__tooltip-icon"
      style={backgroundImageStyles}
      />
      <p className="popup__tooltip-paragraph">
        {isSuccess
          ? 'Вы успешно зарегистрировались!'
          : `${notOkMessage}`
        }
      </p>
    </Popup>
  )
}

export default InfoTooltip;
