const express = require('express');
const userRouter = require('./routes/user');

const app = express();
app.use(express.json());
module.exports = app;

app.use('/users', userRouter);
