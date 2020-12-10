import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  // Достаём данные пользователя из контекста
  const userData = useContext(CurrentUserContext);
  const userName = userData.name;
  const userDescription = userData.about;
  const userAvatar = userData.avatar;

  return (
    <main className="main page__narrow">
      <section className="profile">
        <div
          className="profile__image"
          style={{ backgroundImage: `url(${userAvatar})` }}
        >
          <button
            className="profile__avatar-button"
            aria-label="Редактировать"
            type="button"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__data">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit-button page__button"
            aria-label="Редактировать"
            type="button"
            onClick={onEditProfile}
          />
          <p className="profile__profession">{userDescription}</p>
        </div>
        <button
          className="profile__add-button page__button"
          aria-label="Добавить"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="gallery">
        {cards.map((card) => (
          <Card
            key={card._id}
            {...card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
