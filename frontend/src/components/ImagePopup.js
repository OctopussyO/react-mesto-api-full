import React from "react";
import Popup from "./Popup";

function ImagePopup({ place, isOpen, onClose }) {
  return (
    <Popup
      name='enlarge-image'
      isImageInside={true}
      onClose={onClose}
      isOpen={isOpen}
    >
      <figure className="popup__image-container">
        <img
          className="popup__image"
          src={place.link}
          alt={`${place.name}, фотография`}
        />
        <figcaption>
          <p className="popup__image-caption">{`${place.name}, фотография`}</p>
          <button
            className="popup__close-button page__button"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          />
        </figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;
