const eventController = require('../controllers/event');
const express = require('express');
const router = express.Router();

router.post('/', eventController.create);
router.get('/', eventController.read);
router.get('/:eventId', eventController.readById);
router.get('/user-events/:userId', eventController.readUserEvents);
router.put('/:eventId', eventController.updateById);
router.delete('/:eventId', eventController.deleteById);

module.exports = router;