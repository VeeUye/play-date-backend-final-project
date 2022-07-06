const functions = require('firebase-functions');
const app = require('./src/app.js');

exports.app = functions.region('europe-west2').https.onRequest(app);
