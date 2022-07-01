const functions = require("firebase-functions");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Play Date Scheduler");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

exports.app = functions.region("europe-west2").https.onRequest(app);
