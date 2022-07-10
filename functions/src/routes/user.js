const userController = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.post('/', userController.create);
router.get('/', userController.read);
router.get('/:userId', userController.readById);
router.get('/:userId/friends', userController.readUserFriends);
router.put('/:userId', userController.updateById);
router.delete('/:userId', userController.deleteById);

module.exports = router;
