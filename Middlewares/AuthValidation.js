const Joi = require("joi");
const signinValidation = (req, res, next) => {
  console.log(req.body);
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error, message: "Bad request" });
  }
  next();
};

const logininValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error, message: "Bad request" });
  }
  next();
};

module.exports = {
  signinValidation,
  logininValidation,
};
