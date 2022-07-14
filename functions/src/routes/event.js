const eventController = require('../controllers/event');
const express = require('express');
const router = express.Router();
const dataValidation = require('../middlewares/dataValidation')

router.post('/', dataValidation.eventValidation, eventController.create);

router.get('/', eventController.read);
router.get('/:eventId', eventController.readById);
router.get('/user-events/:userId', eventController.readAcceptedUserEvents);
router.get('/user-events/:userId/pending', eventController.readPendingUserEvents);
router.get('/user-events/:userId/declined', eventController.readDeclinedUserEvents);

router.put('/user-events/accept', eventController.acceptInvite);
router.put('/user-events/decline', eventController.declineInvite);
// router.put('/:eventId', eventController.updateById);
router.delete('/:eventId', eventController.deleteById);

module.exports = router;