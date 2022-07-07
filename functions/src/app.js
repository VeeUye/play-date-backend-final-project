const express = require('express');
const userRouter = require('./routes/user');
const eventRouter = require('./routes/event');

const app = express();
app.use(express.json());
module.exports = app;

app.use('/users', userRouter);
app.use('/events', eventRouter);