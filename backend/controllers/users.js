const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { SALT_ROUND } = require('../configs');
const { getJwt } = require('../utils/jwt');
const { BadRequestError, NotFoundError, ConflictError } = require('../errors');

module.exports.getUsers = (req, res, next) => {
  User.find()
    .orFail(new NotFoundError('Невозможно получить список пользователей'))
    .then((data) => res.send(data))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(new NotFoundError('Пользователя с таким id не существует'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || !password.trim()) {
    throw new BadRequestError('Введены невалидные данные');
  }

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с таким email уже существует');
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
        .catch(next);
    });
};

module.exports.updateUserData = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Пользователя с таким id не существует'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Пользователя с таким id не существует'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || !password.trim()) {
    throw new BadRequestError('Введены невалидные данные');
  }

  return User.findUserByCredentials({ email, password })
    .then((foundUser) => {
      const token = getJwt(foundUser._id);
      return res.status(200).send({ token });
    })
    .catch(next);
};
