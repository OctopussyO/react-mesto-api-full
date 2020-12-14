const router = require('express').Router();
const celebrate = require('../middlewares/celebrate-validator');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', celebrate.createCard, createCard);

router.delete('/cards/:id', celebrate.deleteCard, deleteCard);

router.put('/cards/:id/likes', celebrate.likeCard, likeCard);

router.delete('/cards/:id/likes', celebrate.dislikeCard, dislikeCard);

module.exports = router;
