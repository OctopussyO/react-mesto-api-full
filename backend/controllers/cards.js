const { NotFoundError, ForbiddenError } = require('../errors');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find()
    .then((data) => res.send(data))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  Card.create({ owner: req.user.id, ...req.body })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const userId = req.user.id;
  const cardId = req.params.id;

  // При том способе, который был описан в комментарии ревью, postman выводил
  // ошибку 'Карточка принадлежит другому пользователю', но карточка всё равно удалялась.
  Card.findById(cardId)
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((card) => {
      const cardOwnerId = card.owner.toString();

      if (cardOwnerId !== userId) {
        throw new ForbiddenError('Карточка принадлежит другому пользователю');
      }

      return Card.findByIdAndRemove(cardId)
        .then((deletedCard) => res.status(200).send(deletedCard));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  )
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user.id } },
    { new: true },
  )
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};
