const { User, joiSchemas } = require('../../models/user');
const { createError } = require('../../helpers');
const bcrypt = require('bcrypt');

const login = async (req, res, next) => {
  try {
    // Joi-schema validation
    const { error } = joiSchemas.loginSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    // Unique user validation
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, `User with email:${email} does mot exists`);
    }
    console.dir(user);
    const comparePassword = await bcrypt.compare(password, user.password);
    console.log('comparePassword', comparePassword);
    if (!comparePassword) {
      throw createError(401, 'Password is wrong');
    }
    // creating token
    const token = 'asADASDAS.ASDASDASDA.dfsdfsdfsdf';
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
