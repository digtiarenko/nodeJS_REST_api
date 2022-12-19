const { joiSchemas } = require('../../models/user');
const services = require('../../services/auth');
const { createError } = require('../../helpers');

const login = async (req, res, next) => {
  try {
    // Joi-schema validation
    const { error } = joiSchemas.loginSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }

    const { email, password } = req.body;
    const loginedUser = await services.signIn(email, password);

    res
      .status(200)
      .json({ token: loginedUser.token, email: loginedUser.email });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
