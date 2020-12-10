// Объект исходных данных пользователя
export const initialUserData = {
  name: "Фёдор Конюхов",
  about: "Российский путешественник",
  avatar: "https://uznayvse.ru/images/celebs/konuhov_medium.jpg",
  _id: "01",
};

// Массив с данными исходных карточек
export const initialCardsData = [
  {
    name: "Алтайский край",
    link:
      "https://images.unsplash.com/photo-1494791286225-ea86fc957ba7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1947&q=80",
    owner: {
      name: "Конюхов",
      _id: "01",
    },
  },
  {
    name: "Ладожское озеро",
    link:
      "https://images.unsplash.com/photo-1547846218-c982107d30f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1972&q=80",
    owner: {
      name: "Жак-Ив Кусто",
      _id: "02",
    },
  },
  {
    name: "Гора Нургуш",
    link:
      "https://images.unsplash.com/photo-1506516493400-bb5e8347bf0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80",
    owner: {
      name: "Конюхов",
      _id: "01",
    },
  },
  {
    name: "Судак, Крым",
    link:
      "https://images.unsplash.com/photo-1565342403875-07a8dc5ed13c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80",
    owner: {
      name: "Конюхов",
      _id: "01",
    },
  },
  {
    name: "Байкал",
    link:
      "https://images.unsplash.com/photo-1551844931-cfcfecb3636f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2034&q=80",
    owner: {
      name: "Конюхов",
      _id: "01",
    },
  },
  {
    name: "Владивосток",
    link:
      "https://images.unsplash.com/photo-1563943078-d83d3fb86468?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80",
    owner: {
      name: "Конюхов",
      _id: "01",
    },
  },
];

// Объект данных для API
export const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-15",
  headers: {
    authorization: "584f4afd-78a5-47f8-908c-ac61484f6bb9",
    "Content-Type": "application/json",
  },
};

export const AUTH_BASE_URL = 'https://auth.nomoreparties.co';
