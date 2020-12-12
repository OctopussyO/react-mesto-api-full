require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_NOT_SECRET } = require('../configs');

const { NODE_ENV, JWT_SECRET } = process.env;

const getJwt = (id) => jwt.sign(
  { id },
  NODE_ENV === 'production' ? JWT_SECRET : JWT_NOT_SECRET,
  { expiresIn: '7d' },
);

module.exports = {
  getJwt,
};
