const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { handleCelebrateError } = require('./middlewares/celebrate-error-handler');
const routes = require('./routes/index');
const { auth } = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-error');
const { errorHandler } = require('./middlewares/error-handler');
const celebrate = require('./middlewares/celebrate-validator');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  // Объект опций. Эти свойства прописываем, чтобы избежать проблем совместимости с MongoDB
  // в будущем, т.к. сейчас (2020) логику взаимодействия Mongoose с MongoDB переписывают.
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => console.log('База данных подключена!'))
  .catch((err) => {
    console.log(`Ошибка подключения базы данных: ${err.message}`);
  });

app.use(bodyParser.json());

app.post('/signup', celebrate.signup, createUser);

app.post('/signin', celebrate.signin, login);

app.use('/', auth, routes);
app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

// Обработчик ошибок celebrate
app.use(handleCelebrateError);

// Централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT);
