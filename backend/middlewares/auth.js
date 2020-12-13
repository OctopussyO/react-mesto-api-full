const User = require('../models/user');
const { verifyJwt } = require('../utils/jwt');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');

  const payload = await verifyJwt(token);

  if (!payload) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  return User.findById(payload.id)
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: 'Необходима авторизация' });
      }

      req.user = payload;

      return next();
    });
};

module.exports = {
  auth,
};
