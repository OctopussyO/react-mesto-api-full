import React, { useState } from "react";
import cn from 'classnames';

const FormInputWithError = React.memo(
  ({
    name,
    placeholder,
    type,
    minLength,
    maxLength,
    value,
    onChange,
    inputRef,
    themeModificator,
    actModificator
  }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isValid, setValidState] = useState(true);

    const handleChange = (e) => {
      setErrorMessage(e.target.validationMessage);
      onChange(e);
      setValidState(e.target.validity.valid);
    }

    let inputClassName = cn(
      'form__input',
      {[`form__input_theme_${themeModificator}`]: themeModificator},
      {[`form__input_act_${actModificator}`]: actModificator},
      {'form__input_valid': isValid},
      {'form__input_invalid': !isValid},
    );

    const errorClassName = cn(
      'form__error',
      {[`form__error_in_${name}`]: name},
    );

    return (
      <>
        <input
          className={inputClassName}
          name={name}
          placeholder={placeholder}
          type={type}
          minLength={minLength}
          maxLength={maxLength}
          required
          autoComplete="off"
          value={value}
          onChange={handleChange}
          ref={inputRef}
        />
        <span className={errorClassName}>
          {errorMessage}
        </span>
      </>
    );
  }
);

export default FormInputWithError;
