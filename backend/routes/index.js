const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const celebrate = require('../middlewares/celebrate-validator');
const NotFoundError = require('../errors/not-found-error');
const { handleCelebrateError } = require('../middlewares/celebrate-error-handler');
const { errorHandler } = require('../middlewares/error-handler');

router.post('/signup', celebrate.signup, createUser);

router.post('/signin', celebrate.signin, login);

router.use('/', auth, usersRouter, cardsRouter);
router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

// Обработчик ошибок celebrate
router.use(handleCelebrateError);

// Централизованный обработчик ошибок
router.use(errorHandler);

module.exports = router;
