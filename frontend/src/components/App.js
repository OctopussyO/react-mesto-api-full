import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import cn from 'classnames';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import ResponseError from "./ResponseError";

function App() {
  // Логика загрузки (показываем/убираем спиннер, отрисовываем ошибку при необходимости)
  const [isLoading, setLoadingState] = useState(true);

  const [wasResponse, setResponseState] = useState(false);

  const [responseError, setResponseError] = useState({
    status: '',
    statusText: ''
  });

  let contentClassName = cn('content', {'content_hidden': !wasResponse});
  let responseErrorClassName = cn('response-error', {'response-error_hidden': wasResponse});

  
  // Авторизация пользователя
  const history = useHistory();
  
  const [loggedIn, setLoggedIn] = useState(false);
  
  const [userData, setUserData] = useState({
    email: ''
  });
  
  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      api.getOwnerData(token)
      .then((res) => {
        if (res.email) {
          setUserData({email: res.email});
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        // Здесь ошибку пользователю не выводим, потому что в редких случаях она ему что-то даст.
        // Тот, кому это необходимо, найдёт её в консоли.
        // Вывод ошибки здесь выглядит странно, потому что пользователь даже не поймёт, в чём дело
        // -- зашёл на сайт, ещё ничего не сделал, а уже ошибка.
        console.error(err);
      })
    }
  }

  // При загрузке страницы сразу проверяем, авторизован ли пользователь
  useEffect(() => {
    tokenCheck();
  }, []);
  
  // Загрузка пользовательских данных с сервера
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    api.getOwnerData(token)
    .then((userData) => {
      setCurrentUser(userData);
      api.getData(token)
        .then((cardsData) => {
          setCards(cardsData.reverse());
          setResponseState(true);
        })
    })
    .catch((err) => {
      if (err.status === 401) {
        setResponseState(true);
      } else {
        setResponseError({
          status: err.status,
          statusText: err.statusText
        });
      }
    })
    .finally(() => {
      setLoadingState(false);
    });
  }, [loggedIn]);

  // Стейт-переменная для определения контента тултипа
  const [isSuccess, setSuccess] = useState(true);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState();

  const handleNotSuccessResponse = () => {
    setSuccess(false);
    setInfoTooltipState(true);
  }

  const handleRegister = ({ email, password }) => {
    api.register({ email, password })
    .then((res) => {
        if (res.email) {
          setSuccess(true);
          setInfoTooltipState(true);
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          setInfoTooltipMessage('Некорректно заполнено одно из полей.');
        } else if (err.status === 409) {
          setInfoTooltipMessage('Пользователь с таким email уже существует.')
        }
        handleNotSuccessResponse();
      })
  }

  const handleLogin = ({ email, password }) => {
    api.login({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setUserData({email: email});
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          setInfoTooltipMessage('Некорректно введён email или пароль.')
        } else if (err.status === 400) {
          setInfoTooltipMessage('Не передано одно из полей.')
        }
        handleNotSuccessResponse();
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserData({email: ''});
    setLoggedIn(false);
  }

  // Логика открытия/закрытия попапов
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isImagePopupOpen, setImagePopupState] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupState] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipState] = useState(false);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupState(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupState(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupState(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupState(true);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupState(false);
    setEditProfilePopupState(false);
    setAddPlacePopupState(false);
    setImagePopupState(false);
    setConfirmPopupState(false);
  };
  
  const closeInfoTooltip = () => {
    setInfoTooltipState(false);
    setInfoTooltipMessage('');
  }

  // Стейт-переменные для текущего состояния страницы
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });

  const [cards, setCards] = useState([]);

  // Обработчики для попапов
  const handleUpdateUser = (userData) => {
    const token = localStorage.getItem('token');

    api.saveUserData(token, userData)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        if (err.status === 400) {
          setInfoTooltipMessage('Переданные данные не прошли валидацию')
        }
        handleNotSuccessResponse();
      })
      .finally(() => {
        closeAllPopups();
      });
  };

  const handleUpdateAvatar = (data) => {
    const token = localStorage.getItem('token');

    api.saveUserAvatar(token, data)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        if (err.status === 400) {
          setInfoTooltipMessage('Переданные данные не прошли валидацию')
        }
        handleNotSuccessResponse();
      })
      .finally(() => {
        closeAllPopups();
      });
  };

  const handleAddPlace = (newCard) => {
    const token = localStorage.getItem('token');

    api.saveNewItem(token, newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        if (err.status === 400) {
          setInfoTooltipMessage('Переданные данные не прошли валидацию')
        }
        handleNotSuccessResponse();
      })
      .finally(() => {
        closeAllPopups();
      });
  };

  // Обработчики для карточек
  const handleCardLike = (isLiked, card) => {
    const token = localStorage.getItem('token');

    const handleLikeClick = isLiked
      ? api.unlikeItem.bind(api)
      : api.likeItem.bind(api);
    handleLikeClick(token, card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((cardItem) =>
          cardItem._id === card._id ? newCard : cardItem
        );
        setCards(newCards);
      })
      .catch(() => {
        handleNotSuccessResponse();
      });
  };

  const handleCardDelete = (card) => {
    setSelectedCard(card);
    setConfirmPopupState(true);
  };
  
  const handleConfirmDelete = (card) => {
    const token = localStorage.getItem('token');

    api.deleteItem(token, card._id)
    .then(() => {
      const newCards = cards.filter((cardItem) => cardItem._id !== card._id);
      setCards(newCards);
    }).catch(() => {
      handleNotSuccessResponse();
    }).finally(() => {
      closeAllPopups();
    });    
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header userData={userData} onLogout={handleLogout} wasResponse={wasResponse} />
          {isLoading ? (
            <div className="spinner spinner_visible" />
          ) : (
            <>
              <div className={contentClassName}>
                <Switch>
                  <Route path="/sign-in">
                    <Login
                      onLogin={handleLogin}
                      isInfoTooltipOpen={isInfoTooltipOpen}
                      loggedIn={loggedIn}
                    />
                  </Route>
                  <Route path="/sign-up">
                    <Register
                      onRegister={handleRegister}
                      isInfoTooltipOpen={isInfoTooltipOpen}
                      loggedIn={loggedIn}
                    />
                  </Route>
                  <ProtectedRoute 
                    exact
                    path="/"
                    loggedIn={loggedIn}
                    component={Main}
                    cards={cards}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                  <Route>
                    {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                  </Route>
                </Switch>
              </div>
              <ResponseError
                className={responseErrorClassName}
                responseError={responseError}
              />
            </>
          )}
          <Footer loggedIn={loggedIn} />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <ImagePopup
          place={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <ConfirmPopup
          deletedCard={selectedCard}
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirmDelete={handleConfirmDelete}
        />
        <InfoTooltip
          isSuccess={isSuccess}
          message={infoTooltipMessage}
          isOpen={isInfoTooltipOpen}
          onClose={closeInfoTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
