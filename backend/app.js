const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

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

// Временное решение для авторизации пользователя
app.use((req, res, next) => {
  req.user = {
    _id: '5fb97473c1649e3bac972675',
  };

  next();
});

app.use('/', routes);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
