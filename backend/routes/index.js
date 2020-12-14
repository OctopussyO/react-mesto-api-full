const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const celebrate = require('../middlewares/celebrate-validator');
const NotFoundError = require('../errors/not-found-error');
const { handleCelebrateError } = require('../middlewares/celebrate-error-handler');
const { errorHandler } = require('../middlewares/error-handler');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(requestLogger);

router.post('/signup', celebrate.signup, createUser);

router.post('/signin', celebrate.signin, login);

router.use('/', auth, usersRouter, cardsRouter);
router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

// Логгирует ошибки
router.use(errorLogger);

// Обрабатывает ошибки из celebrate
router.use(handleCelebrateError);

// Обрабатывает ошибки (централизованный обработчик)
router.use(errorHandler);

module.exports = router;
