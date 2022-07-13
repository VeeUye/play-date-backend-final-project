const { eventSchema } = require('../helpers/validationSchema');

exports.eventValidation = async (req, res, next) => {
  try {
    const result = await eventSchema.validateAsync(req.body)
    console.log(result);
    next();
  } catch (error) {
    return res.json({message: error.details[0].message})
  }
}