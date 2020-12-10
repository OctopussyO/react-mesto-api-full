const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find()
    .then((data) => res.send(data))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(new Error('NotExistId'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotExistId') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Введён неверный id' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports.createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Введённые данные не прошли валидацию' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.updateUserData = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('NotExistId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotExistId') {
        res.status(404).send({ message: 'Пользователя с таким id не существует' });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введённые данные не прошли валидацию' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      // Флаг new позволяет вернуть обновлённые данные, а не создаёт нового пользователя.
      // Для создания нового пользователя при его отсутствии потребовалось бы использовать
      // флаг upsert
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('NotExistId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotExistId') {
        res.status(404).send({ message: 'Пользователя с таким id не существует' });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введённые данные не прошли валидацию' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};
