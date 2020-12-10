import React from "react";
import cn from 'classnames';

const FormSubmit = React.memo(({
    submitTitle,
    loadingTitle,
    isActive,
    isClicked,
    themeModificator,
    actModificator
  }) => {
    const className = cn(
      'form__submit-btn',
      {[`form__submit-btn_theme_${themeModificator}`]: themeModificator},
      {[`form__submit-btn_act_${actModificator}`]: actModificator},
      {'form__submit-btn_unblocked': isActive},
      {'form__submit-btn_blocked': !isActive},
    );
    return (
      <button
        className={className}
        disabled={!isActive}
        type="submit"
      >
        {isClicked ? loadingTitle : submitTitle}
      </button>
    );
  }
);

export default FormSubmit;
