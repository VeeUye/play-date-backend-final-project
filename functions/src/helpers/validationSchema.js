const Joi = require ('joi');

const eventSchema = Joi.object({
  date_start: Joi.date().greater('now').required(),
  date_end: Joi.date().greater(Joi.ref('date_start')).required(),
  friends_invited: Joi.array().items(Joi.string()).required(),
  friends_accepted: Joi.array().items(Joi.string()).default([]),
  friends_rejected: Joi.array().items(Joi.string()).default([]),
  location: Joi.string(),
  description: Joi.string(),
  owner: Joi.string()
})

module.exports = { eventSchema };