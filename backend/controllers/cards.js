const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find()
    .then((data) => res.send(data))
    .catch(() => {
      // Обработка 404 тут не нужна, т.к. пользователь ничего не вводит
      // и несуществовать файл может только при ошибке разработчика, если
      // ввести неверное имя модели. При этом сервер вернёт пустой массив.
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.createCard = (req, res) => {
  Card.create({ owner: req.user.id, ...req.body })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Введённые данные не прошли валидацию' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.deleteCard = (req, res) => {
  const userId = req.user.id;
  const cardId = req.params.id;

  Card.findById(cardId)
    .then((card) => {
      const cardOwnerId = card.owner.toString();

      if (cardOwnerId !== userId) {
        return res.status(403).send({ message: 'Карточка принадлежит другому пользователю' });
      }

      return Card.findByIdAndRemove(cardId)
        .orFail(new Error('NotExistId'))
        .then((deletedCard) => res.status(200).send(deletedCard))
        .catch((err) => {
          if (err.message === 'NotExistId') {
            res.status(404).send({ message: 'Нет карточки с таким id' });
          } else if (err.name === 'CastError') {
            res.status(400).send({ message: 'Введён неверный id' });
          } else {
            res.status(500).send({ message: 'Ошибка на сервере' });
          }
        });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  )
    .orFail(new Error('NotExistId'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotExistId') {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Неверный формат id' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user.id } },
    { new: true },
  )
    .orFail(new Error('NotExistId'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotExistId') {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Неверный формат id' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};
