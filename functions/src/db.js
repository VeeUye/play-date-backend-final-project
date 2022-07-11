const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldPath } = require('firebase-admin/firestore');

initializeApp();

const db = getFirestore();

module.exports = {
  db,
  FieldPath,
};
