const mongoose = require('mongoose');
const urlRegex = require('../utils/urlRegex');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: 'Ссылка на изображение введена некорректно.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const cardModel = mongoose.model('card', cardSchema);

module.exports = cardModel;
