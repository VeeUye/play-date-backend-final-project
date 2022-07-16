const Joi = require ('joi');
 
const createUserSchema = Joi.object({
 // userId: Joi.string().required,
 // name: Joi.string().required(),
 // email: Joi.string().email().required,
 userId: Joi.string(),
 name: Joi.string(),
 email: Joi.string().email(),
 description: Joi.string(),
 location: Joi.string(),
 // friends: Joi.array().items(Joi.string()).default([]),
 // children: Joi.array().items(Joi.string()).required,
 children: Joi.string(),
 profile_pic: Joi.string().dataUri(),
})
 
const editUserSchema = Joi.object({
 name: Joi.string(),
 email: Joi.string().email(),
 description: Joi.string(),
 location: Joi.string(),
 friends: Joi.array().items(Joi.string()),
 children: Joi.string(),
 profile_pic: Joi.string().dataUri(),
})
 
 
module.exports = { createUserSchema, editUserSchema };