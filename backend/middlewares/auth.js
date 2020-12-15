const User = require('../models/user');
const { verifyJwt } = require('../utils/jwt');
const UnauthorizedError = require('../errors/unauthorized-error');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация');
    }

    const token = authorization.replace('Bearer ', '');

    const payload = await verifyJwt(token);

    if (!payload) {
      throw new UnauthorizedError('Необходима авторизация');
    }

    await User.findById(payload.id)
      .then((user) => {
        if (!user) {
          throw new UnauthorizedError('Необходима авторизация');
        }

        req.user = payload;
      });
  } catch (err) { next(err); }

  return next();
};

module.exports = {
  auth,
};
