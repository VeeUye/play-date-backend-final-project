const Joi = require ('joi');
 
const userSchema = Joi.object({
  userId: Joi.string().allow('')
    .alter({
      post: (schema) => schema.required(),
      put: (schema) => schema.optional(),
    }),
    name: Joi.string()
    .alter({
      post: (schema) => schema.required(),
      put: (schema) => schema.optional(),
    }),
    email: Joi.string().email()
      .alter({
        post: (schema) => schema.required(),
        put: (schema) => schema.optional(),
      }),    
    description: Joi.string(),
    location: Joi.string(),
    friends: Joi.array().items(Joi.string()),
    children: Joi.string(),
    imgUrl: Joi.string().allow(null),
    child: Joi.string(),
});

const postUserSchema = userSchema.tailor('post');
const putUserSchema = userSchema.tailor('put');


// const createUserSchema = Joi.object({
//  // userId: Joi.string().required,
//  userId: Joi.string(),
//  // name: Joi.string().required(),
//  name: Joi.string(),
//  // email: Joi.string().email().required,
//  email: Joi.string().email(),
//  description: Joi.string(),
//  location: Joi.string(),
//  friends: Joi.array().items(Joi.string()),
//  // children: Joi.array().items(Joi.string()).required,
//  children: Joi.string(),
//  profile_pic: Joi.string().dataUri(),
// })
 
// const editUserSchema = Joi.object({
//  name: Joi.string(),
//  email: Joi.string().email(),
//  description: Joi.string(),
//  location: Joi.string(),
//  friends: Joi.array().items(Joi.string()),
//   // children: Joi.array().items(Joi.string()).required,
//  children: Joi.string(),
//  profile_pic: Joi.string().dataUri(),
// })
 
 
module.exports = { postUserSchema, putUserSchema };