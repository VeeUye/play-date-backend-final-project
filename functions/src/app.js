const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');
const eventRouter = require('./routes/event');
const validateFirebaseIdToken = require('./middlewares/authTokenValidation');

const app = express();
app.use(cors());
app.use(validateFirebaseIdToken);
app.use(express.json());
module.exports = app;

app.use('/users', userRouter);
app.use('/events', eventRouter);
