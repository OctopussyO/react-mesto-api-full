import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import useFormValidation from '../hooks/useFormValidation';
import FormSubmit from "./FormSubmit";

function Form ({
  themeModificator,
  actModificator,
  children,
  name,
  title,
  submitTitle,
  submitLoadingTitle,
  isSubmitActive,
  onSubmit,
  isInfoTooltipOpen
}) {
  const formClassName = cn(
    'form',
    {[`form_theme_${themeModificator}`]: themeModificator},
    {[`form_act_${actModificator}`]: actModificator},
  );

  const headingClassName = cn(
    'form__heading',
    {[`form__heading_theme_${themeModificator}`]: themeModificator},
    {[`form__heading_act_${actModificator}`]: actModificator},
  );

  // Определяем, нажата ли кнопка отправки формы для подстановки загрузочного текста
  const [isSubmitted, setSubmitState] = useState(false);

  // Определяем форму для валидации
  const formRef = useRef();

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitState(true);
    onSubmit();
  };

  // Для случаев, когда появляется тултип с результатом отправки формы,
  // обнуляем стейт кнопки отправки формы, чтобы убрать прелоадер.
  useEffect(() => {
    setSubmitState(false);
  }, [isInfoTooltipOpen]);

  // Используем пользовательский хук валидации формы
  let { isSubmitValid } = useFormValidation({ formRef, isSubmitActive });

  return (
    <form
      action="#"
      className={formClassName}
      name={name}
      method="GET"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      {title && <h2 className={headingClassName}>{title}</h2>}
      {children}
      <FormSubmit
        themeModificator={themeModificator}
        actModificator={actModificator}
        submitTitle={submitTitle}
        loadingTitle={submitLoadingTitle}
        isActive={isSubmitValid}
        isClicked={isSubmitted}
      />
    </form>
  )
}

export default Form;
