const mongoose = require('mongoose');
const urlRegex = require('../utils/urlRegex');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: 'Ссылка на изображение введена некорректно.',
    },
  },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
