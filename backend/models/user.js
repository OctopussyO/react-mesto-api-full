const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const urlRegex = require('../utils/urlRegex');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Email введён некорректно.',
    },
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: 'Ссылка на изображение введена некорректно.',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

userSchema.statics.findUserByCredentials = function (user) {
  const { email, password } = user;

  return this.findOne({ email }).select('+password')
    .then((foundUser) => {
      if (!foundUser) {
        return Promise.reject(new Error('Unauthorized'));
      }

      return bcrypt.compare(password, foundUser.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Unauthorized'));
          }

          return foundUser;
        });
    });
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
