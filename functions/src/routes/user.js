const userController = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.post('/', userController.create);
router.get('/', userController.read);
router.get('/:userId', userController.readById);

module.exports = router;
