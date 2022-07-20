const { postEventSchema, putEventSchema, eventAcceptDeclineSchema } = require('../models/eventSchema');
const { postUserSchema, putUserSchema } = require('../models/userSchema');
const validateData = require('./helpers');
 
exports.postEventValidation = (req, res, next) => {
  validateData(req, res, next, postEventSchema);
};
 
exports.putEventValidation = (req, res, next) => {
  validateData(req, res, next, putEventSchema);
};

exports.putEventAccDecValidation = (req, res, next) => {
  validateData(req, res, next, eventAcceptDeclineSchema);
};

exports.postUserValidation = (req, res, next) => {
  validateData(req, res, next, postUserSchema);
};
 
exports.putUserValidation = (req, res, next) => {
  validateData(req, res, next, putUserSchema);
};
