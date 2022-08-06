const { joiSchemas } = require('../../models/user');
const { createError } = require('../../helpers');
const services = require('../../services/auth');

const register = async (req, res, next) => {
  try {
    // Joi-schema validation
    const { error } = joiSchemas.registerSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    // Unique user validation
    const { name, email, password } = req.body;

    const user = await services.signUp(name, email, password);
    // if (user) {
    //   throw createError(409, `${email} is already exists`);
    // }
    // // creating new user
    // const hashPassword = await bcrypt.hash(password, 10);

    // const result = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
