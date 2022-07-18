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
    children: Joi.array(),
    imgUrl: Joi.string().allow(null),
    child: Joi.string(),
});

const postUserSchema = userSchema.tailor('post');
const putUserSchema = userSchema.tailor('put');

 
 
module.exports = { postUserSchema, putUserSchema };