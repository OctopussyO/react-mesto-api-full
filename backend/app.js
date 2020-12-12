const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const { auth } = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');

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

app.post('/signup', createUser);

app.post('/signin', login);

app.use('/', auth, routes);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
