const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUserData,
  updateUserAvatar,
  login,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getUser);

router.post('/users', createUser);

router.post('/login', login);

router.patch('/users/me', updateUserData);

router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
