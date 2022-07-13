'use strict';

const { db } = require('../db');

exports.create = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('user').doc().set(data);
    res.send('Record saved successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.read = async (_, res) => {
  try {
    const snapshot = await db.collection('user').get();
    const userArray = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    res.send(userArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.readById = async (req, res) => {
  try {
    const snapshot = await db
      .collection('user')
      .where('userId', '==', req.params.userId)
      .get()
      .then((query) => {
        return query.docs[0].data();
      });
    res.send(snapshot);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.readUserFriends = async (req, res) => {
  try {
    const snapshot = await db
      .collection('user')
      .where('userId', '==', req.params.userId)
      .get()
      .then((query) => {
        return query.docs[0].data();
      });
    const userFriendsFilter = await db
      .collection('user')
      .where('userId', 'in', snapshot.friends)
      .get();
    const userFriendsArray = userFriendsFilter.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    res.send(userFriendsArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateById = async (req, res) => {
  try {
    const snapshot = await db
      .collection('user')
      .where('userId', '==', req.params.userId)
      .get()
      .then((query) => {
        return query.docs[0].id;
      });
    await db.collection('user').doc(snapshot).update(req.body);
    res.send('Record updated successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const batch = db.batch();
    const FriendsUser = await db
      .collection('user')
      .where('friends', 'array-contains', req.params.userId)
      .get();
    FriendsUser.docs.forEach((doc) => {
      const filterFriendsUser = doc
        .data()
        .friends.filter((item) => item !== req.params.userId);
      batch.update(doc.ref, { friends: filterFriendsUser });
    });
    batch.delete(db.collection('user').doc(req.params.userId));
    await batch.commit();
    res.send('Record deleted successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
