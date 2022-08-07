const { joiSchemas } = require('../../models/user');
const { createError } = require('../../helpers');
const services = require('../../services/auth');
const gravatar = require('gravatar');

const register = async (req, res, next) => {
  try {
    // Joi-schema validation
    const { error } = joiSchemas.registerSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    // Unique user validation
    const { name, email, password } = req.body;
    const avatarURL = gravatar.url(email);
    const user = await services.signUp(name, email, password, avatarURL);

    res.status(201).json({
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
