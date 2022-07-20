const Joi = require ('joi');
 
const eventSchema = Joi.object({
  eventId: Joi.string(),
  name: Joi.string()
    .alter({
      post: (schema) => schema.required(),
      put: (schema) => schema.optional(),
    }),
  date_start: Joi.date()
    .greater('now')
    .alter({
      post: (schema) => schema.required(),
      put: (schema) => schema.optional(),
    }),
  date_end: Joi.date()
    .greater(Joi.ref('date_start'))
    .alter({
      post: (schema) => schema.required(),
      put: (schema) => schema.optional(),
    }),
  friends_invited: Joi.array().items(Joi.string()),
  friends_accepted: Joi.array().items(Joi.string()).default([]),
  friends_declined: Joi.array().items(Joi.string()).default([]),
  location: Joi.string()
    .alter({
      post: (schema) => schema.required(),
      put: (schema) => schema.optional(),
    }),
  description: Joi.string()
    .alter({
      post: (schema) => schema.required(),
      put: (schema) => schema.optional(),
    }),
  owner: Joi.string().allow(''),
 });
  
 const postEventSchema = eventSchema.tailor('post');
 const putEventSchema = eventSchema.tailor('put');
 
 const eventAcceptDeclineSchema = Joi.object({
  eventId: Joi.string(),
  userId: Joi.string()
});


module.exports = {postEventSchema, putEventSchema, eventAcceptDeclineSchema};