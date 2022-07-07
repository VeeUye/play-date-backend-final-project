'use strict';

const { db } = require('../db');

exports.create = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('events').doc().set(data);
    res.status(201).send('Record saved successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.read = async (_, res) => {
  try {
    const snapshot = await db.collection('events').get();
    const eventsArray = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    res.send(eventsArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.readById = async (req, res) => {
  try {
    const snapshot = await db.collection('events').doc(req.params.eventId).get();
    res.send({ id: snapshot.id, ...snapshot.data() });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateById = async (req, res) => {
  try {
    await db.collection('events').doc(req.params.eventId).update(req.body);
    res.send('Record updated successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteById = async (req, res) => {
  try {
    await db.collection('events').doc(req.params.eventId).delete();
    res.send('Record deleted successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};