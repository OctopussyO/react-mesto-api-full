const { celebrate, Joi } = require('celebrate');
const urlRegex = require('../utils/urlRegex');

const joiIdOptions = {
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).required(),
  }),
};

const joiCredentialsOptions = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};

const createCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(urlRegex),
  }),
}, {
  messages: {
    'string.pattern.base': 'Your {#label} does not matche the suggested pattern',
  },
});

const deleteCard = celebrate(joiIdOptions);

const likeCard = celebrate(joiIdOptions);

const dislikeCard = celebrate(joiIdOptions);

const signup = celebrate(joiCredentialsOptions);

const signin = celebrate(joiCredentialsOptions);

const getUser = celebrate(joiIdOptions);

const updateUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateUserAvatar = celebrate({
  body: Joi.object().keys({
    link: Joi.string().required().pattern(urlRegex),
  }),
}, {
  messages: {
    'string.pattern.base': 'Your {#label} does not matche the suggested pattern',
  },
});

module.exports = {
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  signup,
  signin,
  getUser,
  updateUserData,
  updateUserAvatar,
};
