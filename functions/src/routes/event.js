const eventController = require('../controllers/event');
const express = require('express');
const router = express.Router();
const  { postEventValidation, putEventValidation, putEventAccDecValidation }  = require('../middlewares/dataValidation')

router.post('/', postEventValidation, eventController.create);

router.get('/', eventController.read);
router.get('/:eventId', eventController.readById);
router.get('/user-events/:userId', eventController.readAcceptedUserEvents);
router.get('/user-events/:userId/pending', eventController.readPendingUserEvents);
router.get('/user-events/:userId/declined', eventController.readDeclinedUserEvents);

router.put('/user-events/accept', putEventAccDecValidation, eventController.acceptInvite);
router.put('/user-events/decline', putEventAccDecValidation, eventController.declineInvite);
// router.put('/:eventId', eventController.updateById);
router.delete('/:eventId', eventController.deleteById);

module.exports = router;