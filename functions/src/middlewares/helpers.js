const validateData = async (req, res, next, schema) => {
  try {
    await schema.validateAsync(req.body, { warnings: true });
    next();
  } catch (error) {
    return res.json({message: error.details});
  }
 };
  
 module.exports = validateData;