const Joi = require ('joi');

const eventSchema = Joi.object({
  date_start: Joi.date().greater('now').required(),
  date_end: Joi.date().greater(Joi.ref('date_start')).required(),
  friends_invited: Joi.array().items(Joi.string()),
  friends_accepted: Joi.array().items(Joi.string()).default([]),
  friends_declined: Joi.array().items(Joi.string()).default([]),
  location: Joi.string().required(),
  description: Joi.string().required(),
  owner: Joi.string().required(),
})

module.exports = { eventSchema };