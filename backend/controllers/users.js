const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { SALT_ROUND } = require('../configs');
const { getJwt } = require('../utils/jwt');

module.exports.getUsers = (req, res) => {
  User.find()
    .then((data) => res.send(data))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.getUser = (req, res) => {
  const { id } = req.user;
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
  const { email, password } = req.body;

  if (!email || !password || !password.trim()) {
    return res.status(400).send({ message: 'Невалидные данные' });
  }

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(409).send({ message: 'Пользователь с таким email уже существует' });
      }

      return bcrypt.hash(password, SALT_ROUND);
    })
    .then((hash) => {
      User.create({ email, password: hash })
        .then((newUser) => {
          res.status(200).send({
            _id: newUser._id,
            name: newUser.name,
            about: newUser.about,
            avatar: newUser.avatar,
            email: newUser.email,
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return res.status(400).send({ message: 'Введённые данные не прошли валидацию' });
          }
          return res.status(500).send({ message: 'Ошибка на сервере' });
        });
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || !password.trim()) {
    return res.status(400).send({ message: 'Невалидные данные' });
  }

  return User.findUserByCredentials({ email, password })
    .then((foundUser) => {
      const token = getJwt(foundUser._id);
      return res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Введённые данные не прошли валидацию' });
      }
      if (err.message === 'Unauthorized') {
        return res.status(401).send({ message: 'Неверный email или пароль' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};
