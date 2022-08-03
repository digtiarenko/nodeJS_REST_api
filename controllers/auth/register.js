const { User, joiSchemas } = require('../../models/user');
const { createError } = require('../../helpers');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
  try {
    // Joi-schema validation
    const { error } = joiSchemas.registerSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    // Unique user validation
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, `${email} is already exists`);
    }
    // creating new user

    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      name: result.name,
      email: result.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
