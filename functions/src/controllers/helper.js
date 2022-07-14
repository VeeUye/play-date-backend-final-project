const { db } = require('../db');

const getUserEvents = async (req, res, status) =>
{
  try {
    const {userId} = req.params; 
    const friends_field = `friends_${status}`
    const eventsRef = db.collection('events');
    const userEvents = await eventsRef
      .where(friends_field, 'array-contains', userId)
      .orderBy('date_start', 'asc')
      .get();
    const eventsArray = userEvents.docs.map((doc) => {
      let event = { id: doc.id, ...doc.data() };
      event.date_start = new Date(event.date_start._seconds * 1000);
      event.date_end = new Date(event.date_end._seconds * 1000);
      return event;
    });
    res.send(eventsArray);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = { getUserEvents }