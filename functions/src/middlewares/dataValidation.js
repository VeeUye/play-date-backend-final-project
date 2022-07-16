const { postEventSchema, putEventSchema } = require('../models/eventSchema');
const { createUserSchema, editUserSchema } = require('../models/userSchema');
const validateData = require('./helpers');
 
exports.postEventValidation = (req, res, next) => {
  validateData(req, res, next, postEventSchema);
};
 
exports.putEventValidation = (req, res, next) => {
  validateData(req, res, next, putEventSchema);
};
 
exports.createUserValidation = (req, res, next) => {
  validateData(req, res, next, createUserSchema);
};
 
exports.editUserValidation = (req, res, next) => {
  validateData(req, res, next, editUserSchema);
};
