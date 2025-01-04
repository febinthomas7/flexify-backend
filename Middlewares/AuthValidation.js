const Joi = require("joi");
const dns = require("dns");
const signinValidation = async (req, res, next) => {
  // Joi schema definition for basic validation
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string()
      .email()

      .required(),
    password: Joi.string().min(4).max(100).required(),
  });

  // Validate the body against the schema
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: error.details[0].message, message: "Bad request" });
  }

  const email = req.body.email;
  const domain = email.split("@")[1];

  // DNS MX record validation
  try {
    const addresses = await dns.promises.resolveMx(domain);

    if (!addresses || addresses.length === 0) {
      return res.status(400).json({ message: "Invalid email domain" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Invalid email domain" });
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
