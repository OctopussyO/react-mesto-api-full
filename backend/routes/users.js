const router = require('express').Router();
const celebrate = require('../middlewares/celebrate-validator');
const {
  getUsers,
  getUser,
  updateUserData,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', celebrate.getUser, getUser);

router.patch('/users/me', celebrate.updateUserData, updateUserData);

router.patch('/users/me/avatar', celebrate.updateUserAvatar, updateUserAvatar);

module.exports = router;
