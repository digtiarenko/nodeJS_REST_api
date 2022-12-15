const services = require('../../services/auth');
const { createError } = require('../../helpers');
const { joiSchemas } = require('../../models/user');

const secondVerify = async (req, res, next) => {
  try {
    const { email } = req.body;

    const { error } = joiSchemas.emailSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const user = await services.secondVerifyEmail(email);
    res
      .status(200)
      .json({ message: `Verification email sent to ${user.email}` });
  } catch (error) {
    next(error);
  }
};
module.exports = secondVerify;
