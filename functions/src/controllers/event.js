'use strict';
 
const { Timestamp } = require('firebase-admin/firestore');
const { db } = require('../db');
 
const JSDOtoTimestamp = (d) => {
 return Timestamp.fromDate(new Date(d));
}

const TimestampToJSDO = (d) => {
  return new Date(d*1000);
 }
 
// POST ~/events
exports.create = async (req, res) => {
  try {
    let data = req.body;
    data.date_start = JSDOtoTimestamp(data.date_start);
    data.date_end = JSDOtoTimestamp(data.date_end);
    await db.collection('events').doc().set(data);
    res.status(201).send('Record saved successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
 };
 
// GET ~/events
 exports.read = async (_, res) => {
  try {
    const snapshot = await db.collection('events').get();
    const eventsArray = snapshot.docs.map((doc) => {
      let event = { id: doc.id, ...doc.data() };
      event.date_start = TimestampToJSDO(event.date_start._seconds);
      event.date_end = TimestampToJSDO(event.date_end._seconds);
      return event;
    });
    res.send(eventsArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
 };

//  GET ~/events/user-events/{userId}
 exports.readUserEvents = async (req, res) => {
  try {
    const {userId} = req.params; 
    const eventsRef = db.collection('events');
    const userEvents = await eventsRef
      .where('friends_confirmed', 'array-contains', userId)
      .orderBy('date_start', 'asc')
      .get();
    const eventsArray = userEvents.docs.map((doc) => {
      let event = { id: doc.id, ...doc.data() };
      event.date_start = TimestampToJSDO(event.date_start._seconds);
      event.date_end = TimestampToJSDO(event.date_end._seconds);
      return event;
    });
    res.send(eventsArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
 };

// GET ~/events/{eventId}
exports.readById = async (req, res) => {
  try {
    const snapshot = await db.collection('events').doc(req.params.eventId).get();
    let event = { id: snapshot.id, ...snapshot.data() }
    event.date_start = TimestampToJSDO(event.date_start._seconds);
    event.date_end = TimestampToJSDO(event.date_end._seconds);
    res.send(event);
  } catch (error) {
    res.status(400).send(error.message);
  }
 };
 
// PUT ~/events/{eventId}
exports.updateById = async (req, res) => {
  try {
    await db.collection('events').doc(req.params.eventId).update(req.body);
    res.send('Record updated successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// DELETE ~/events/{eventId}
exports.deleteById = async (req, res) => {
  try {
    await db.collection('events').doc(req.params.eventId).delete();
    res.send('Record deleted successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};